from flask import Flask, jsonify, request
import http.client
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
import json
import re
import io
import base64
import uuid

app = Flask(__name__)

# Solicitud HTTP a la API
def fetch_api_data(uuid_value):
    try:
        conn = http.client.HTTPConnection("localhost", 3006)
        print(uuid_value)
        url = f"/api/v1/clientes/{uuid_value}/publicaciones/dia"  # Usar el UUID en la URL
        conn.request("GET", url)
        res = conn.getresponse()
        data = res.read().decode("utf-8")
        
        # Convertir la respuesta a JSON
        cuerpo = json.loads(data)
        if 'data' in cuerpo:
            # Eliminar sufijos de las fechas (st, nd, rd, th)
            datos = json.loads(cuerpo['data'])
            for entry in datos:
                entry['dia'] = re.sub(r'(st|nd|rd|th)$', '', entry['dia'])  # Eliminar sufijos de las fechas
            return pd.DataFrame(datos)
        else:
            return pd.DataFrame()
    except Exception as e:
        print(f"Error en la solicitud HTTP: {e}")
        return pd.DataFrame()

# Preprocesar los datos
def preprocess_data(data):
    data['dia'] = pd.to_datetime(data['dia'])
    data.set_index('dia', inplace=True)
    data = data.resample('D').sum()  # Asegurar frecuencia diaria
    data['total_publicaciones'] = data['total_publicaciones'].interpolate()  # Interpolación
    return data

# Entrenar modelo ARIMA y realizar predicción
def train_and_predict(data):
    model = ARIMA(data['total_publicaciones'], order=(1, 1, 15))
    result = model.fit()
    forecast = result.get_forecast(steps=28)
    forecast_df = forecast.summary_frame()

    # Asegurarse de que los valores no sean menores a 0
    forecast_df['mean'] = forecast_df['mean'].round().astype(int).apply(lambda x: max(0, x))
    forecast_df['mean_ci_lower'] = forecast_df['mean_ci_lower'].round().astype(int).apply(lambda x: max(0, x))
    forecast_df['mean_ci_upper'] = forecast_df['mean_ci_upper'].round().astype(int).apply(lambda x: max(0, x))

    forecast_df.index = pd.date_range(start=data.index[-1] + pd.Timedelta(days=1),
                                      periods=len(forecast_df), freq='D')
    return forecast_df


@app.route('/api/prediccion/<uuid_value>', methods=['GET'])
def get_prediction(uuid_value):
    print(f"Solicitud recibida para UUID: {uuid_value}")
    try:
        uuid.UUID(uuid_value)
    except ValueError:
        return jsonify({"error": "UUID no válido"}), 400

    api_data = fetch_api_data(uuid_value)
    if not api_data.empty:
        processed_data = preprocess_data(api_data)
        forecast = train_and_predict(processed_data)
        response = {
            'forecast': f'{forecast['mean'].to_dict()}',
            'datos': f'{processed_data.to_dict()}'
        }
        print("Predicción realizada con éxito.")
        return jsonify(response)
    else:
        print("No se pudo obtener datos de la API externa.")
        return jsonify({"error": "No se pudo obtener los datos de la API externa."}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=6000)
