import dotenv from 'dotenv';
import { Request, Response } from "express";
import axios from 'axios';

dotenv.config()

export async function RegistroUsuario (req: Request, res:Response){
    const usuarios = process.env.USUARIOS_SERVICE_URL||"http://localhost:3000/api/v1/usuarios"
    const caractristicas =  [
        /^(?=.*[A-Z])(?=.*[#*\-_!¡])[A-Za-z0-9#*\-_!¡]{8,}$/,//password
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,//nombre
        /^\d{10}$/,//telefono
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, //correo
    ];
    const {nombre, password, id_lead, telefono, correo, sendBy} = req.body;
    try {
      if(!nombre&&!password&&!id_lead&&!telefono&&!correo&&sendBy){
        throw('Faltan campos')
      }
  
      const constenido = [password, nombre, telefono, correo]
      const nombres = ['password', 'nombre', 'telefono', 'correo']
  
      for (let index = 0; index < caractristicas.length; index++) {
        if(!caractristicas[index].test(constenido[index])){
          throw(`${nombres[index]} no valido`)
        }
      }
  
      if (sendBy!='whatsapp'&&sendBy!='correo'){
        throw('No se difinio por donde enviar el token')
      }
  
      const body = {
        'nombre': nombre,
        'password': password,
        'telefono': telefono,
        'correo': correo,
        'id_lead': id_lead,
        'sendBy': sendBy
      }
  
      const respuesta = await axios.post(usuarios, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.status(respuesta.status).send(respuesta.data)
    } catch (error: any) {
      if (error.response) {
        res.status(error.response.status).send({ data: error.response.data });
      } else if (error.request) {
        res.status(503).send({ error: 'No se obtuvo respuesta del servidor externo' });
      } else {
        res.status(400).send({ error: error.message || error });
      }
    }
}