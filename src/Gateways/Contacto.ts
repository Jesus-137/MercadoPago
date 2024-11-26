import dotenv from 'dotenv';
import { Request, Response } from "express";
import axios from 'axios';

dotenv.config()

export async function Contacto (req:Request, res:Response){
    const leads = process.env.LEADS_SERVICE_URL || "http://localhost:3000/api/v1/leads";
    const {username, telefono, correo, sendBy} = req.body;
    try {
      const caracteristicas = [
        /^[a-zA-Z0-9]+$/,//username
        /^\d{10}$/,//telefono
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, //correo
      ]
      if(!username&&!telefono&&!correo){
        throw('Faltan campos')
      }
  
      if(sendBy!='whatsapp'&&sendBy!='correo'){
        throw('no se especifico por donde mandar el mensaje')
      }
  
      const contenido = [
        username,
        telefono,
        correo
      ]
  
      const nombres = [
        'username',
        'telefono',
        'correo',
      ]
  
      for (let index = 0; index < caracteristicas.length; index++) {
        if(!caracteristicas[index].test(contenido[index])){
          throw(`${nombres[index]} no valido`)
        }
      }
  
      const body = {
        'username': username,
        'telefono': telefono,
        'correo': correo,
        'sendBy': sendBy
      }
  
      const respuesta = await axios.post(leads, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      res.status(respuesta.status).send(respuesta.data)
    } catch (error: any) {
      res.status(error.response?.status || 500).send({
        error: "Error procesando la solicitud en el Gateway.",
        detalles: error.response?.data || error.message,
      });
    }
}