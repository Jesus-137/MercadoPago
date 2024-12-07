from flask import Flask, request, jsonify
from spellchecker import SpellChecker
import re
from transformers import pipeline

app = Flask(__name__)

# Inicialización del corrector ortográfico
spell = SpellChecker(language='es')

# Inicialización del clasificador de sentimientos
clasificador = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")

# Lista de palabras groseras personalizadas
swear_words = [
    r"ch[i1!][nñ][g9q][a4@]",
    r"tu m[a4@]dr[e3]",
    r"p[vb][t7][o0*@]",
    r"m[i1][e3]r[dcl][a4@]",
    r"m[a4@]lp[a4@]r[i1]d[o0]",
    r"p[e3]nd[e3]j[o0]",
    r"c[o0]j[o0]n[e3]s?",
    r"b[o0]l[a4@]s",
    r"v[a4@]g[o0]n[o0]",
    r"f[u0]t[a4@]n[o0]s?",
    r"put[o0]",
    r"mierd[a4@]",
    r"v[e3]rg[a4@]",
    r"m[a4@]ld[i1][t7][a4@]",
    r"h[i1]j[o0][dcl][a4@]",
    r"p[e3]r[r4]a",
    r"c[a4@]b[r3][o0]n[e3]s?",
    r"m[a4@]l[nñ][dcl][o0][s5]",
    r"t[a4@]r[a4@][dcl][o0][s5]",
    r"v[a4@][c9][o0][nñ][a4@]",
    r"h[o0]l[e3]r[a4@][s5]",
    r"p[a4@][t7]u[e3][r4][dcl][o0][s5]",
    r"h[o0]rr[a4@][dcl][o0][s5]",
]

def censor_custom(text):
    """
    Función para censurar palabras groseras personalizadas.
    """
    for word in swear_words:
        text = re.sub(word, '*' * len(word), text, flags=re.IGNORECASE)
    return text

def analizar_sentimiento_con_estrellas(texto):
    """
    Analiza el sentimiento del texto y devuelve una calificación de 1 a 5 estrellas.
    """
    resultado = clasificador(texto)[0]
    estrellas = int(resultado['label'][0])
    probabilidad = resultado['score']
    return estrellas, probabilidad

@app.route('/corregir', methods=['POST'])
def corregir_texto():
    """
    Endpoint para corregir ortografía.
    """
    data = request.get_json()
    texto = data.get('texto', '')

    palabras = texto.split()
    texto_corregido = " ".join([spell.correction(palabra) for palabra in palabras])

    return jsonify({
        "texto_original": texto,
        "texto_corregido": texto_corregido
    })

@app.route('/censurar', methods=['POST'])
def censurar_texto():
    """
    Endpoint para censurar palabras groseras.
    """
    data = request.get_json()
    texto = data.get('texto', '')

    censored_text = censor_custom(texto)

    return jsonify({
        "texto_original": texto,
        "texto_censurado": censored_text
    })

@app.route('/analizar_sentimiento', methods=['POST'])
def analizar_sentimiento():
    """
    Endpoint para analizar el sentimiento y devolver estrellas.
    """
    data = request.get_json()
    texto = data.get('texto', '')

    estrellas, probabilidad = analizar_sentimiento_con_estrellas(texto)

    return jsonify({
        "texto_original": texto,
        "calificacion_estrellas": estrellas,
        "probabilidad": probabilidad
    })

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
    app.run(debug=True, port=5001)
    app.run(debug=True)
