import dotenv from 'dotenv';
import { Request, Response } from 'express';
import axios from 'axios';

dotenv.config()

export async function LoginCliente (req: Request, res:Response){
    const clientes = process.env.CLIENTES_SERVICE_URL || "http://localhost:3000/api/v1/clientes"
    const {nombre, password} = req.query;
    try {
        let respuesta
        if(!nombre&&!password){
            respuesta = await axios.get(clientes,{
                params: req.query
            })
        }else if(nombre&&password){
            const params = {'nombre': nombre, 'password': password}
    
            respuesta = await axios.get(clientes, {
                params: params,
            })
        }else{
            throw('Falta nombre o contraseña')
        }
        res.status(respuesta.status).send(respuesta.data)
    } catch (error: any) {
        res.status(error.response?.status || 500).send({
            error: "Error procesando la solicitud en el Gateway.",
            detalles: error.response?.data || error.message,
        });
    }
}