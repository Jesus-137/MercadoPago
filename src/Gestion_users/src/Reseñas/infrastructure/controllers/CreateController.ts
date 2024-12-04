import { Request, Response } from "express";
import axios from 'axios';
import { CreateUseCase } from "../../application/CreateUseCase";
import { Clientes_Id } from "../../../../../ValueObjects/Cliente_id";
import { produceMessage } from "../../../../../Rabbit/SendEventUseCase";

export class CreateClienteController {
  constructor(readonly createUseCase: CreateUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      
      if (data.id_usuario && data.id_cliente && data.comentario) {
        const id_cliente = await new Clientes_Id().get(data.id_cliente);
        if (id_cliente) {
          // Llamar a los endpoints de Flask
          const corregirResponse = await axios.post('http://localhost:5000/corregir', {
            texto: data.comentario
          });
          const textoCorregido = corregirResponse.data.texto_corregido;
          const censurarResponse = await axios.post('http://localhost:5000/censurar', {
            texto: textoCorregido
          });
          const textoCensurado = censurarResponse.data.texto_censurado;
          const sentimientoResponse = await axios.post('http://localhost:5000/analizar_sentimiento', {
            texto: textoCensurado
          });
          console.log(sentimientoResponse.data.calificacion_estrellas)

          // Obtener los resultados de la API de Flask
          const sentimiento = sentimientoResponse.data.calificacion_estrellas;

          // Ahora puedes utilizar los resultados de Flask junto con la lógica de tu aplicación
          const cliente = await this.createUseCase.run(
            data.id_usuario,
            id_cliente,
            textoCensurado,  // Puedes usar el texto censurado, corregido o el original
            sentimiento
          );

          if (typeof(cliente) == 'object') {
            res.status(201).send({
              status: "success",
              data: {
                id: cliente.uuid,
                comentario: cliente.comentario,
                estrellas: cliente.estrellas
              },
            });
            console.log('Registro exitoso');
          } else {
            throw(cliente);
          }
        } else {
          throw('Cliente no encontrado');
        }
      } else {
        throw ('Campos insuficientes por favor de verificarlos');
      }
    } catch (error) {
      produceMessage('Error', `{"tarjet": ${data.id_usuario}, "accion": ${String(error)}}`)
      res.status(400).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
