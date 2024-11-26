import dotenv from 'dotenv';
import { Request, Response } from 'express';
import axios from 'axios';

dotenv.config()

export async function LoginCliente (req: Request, res:Response){
    const clientes = process.env.CLIENTES_SERVICE_URL || "http://localhost:3000/api/v1/clientes"
    const {nombre, password} = req.query;
    try {
        if(!nombre){
        throw('Se necesita un nombre');
        }

        if(!password){
        throw('Se necesita una contraseña')
        }

        const params = {'nombre': nombre, 'password': password}

        const respuesta = await axios.get(clientes, {
        params: params,
        })
        res.status(respuesta.status).send(respuesta.data)
    } catch (error: any) {
        res.status(error.response?.status || 500).send({
            error: "Error procesando la solicitud en el Gateway.",
            detalles: error.response?.data || error.message,
        });
    }
}