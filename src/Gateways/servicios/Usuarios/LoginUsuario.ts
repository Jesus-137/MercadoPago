import dotenv from 'dotenv';
import { Request, Response } from "express";
import axios from 'axios';

dotenv.config()

export async function LoginUsuario (req: Request, res:Response){
    const usuarios = process.env.USUARIOS_SERVICE_URL||"http://localhost:3000/api/v1/usuarios"
    const {nombre, password} = req.query;
    try {
      let respuesta
      if(!nombre&&!password){
        respuesta = await axios.get(usuarios)
      }else if(nombre&&password){
        const params = {'nombre': nombre, 'password': password}
        respuesta = await axios.get(usuarios,{
          params: params
        })
      }else{
        throw('Falta un campo para el login')
      }
      res.status(respuesta.status).send(respuesta.data)
    } catch (error:any) {
      res.status(error.response?.status || 500).send({
        error: "Error procesando la solicitud en el Gateway.",
        detalles: error.response?.data || error,
      });
    }
  }