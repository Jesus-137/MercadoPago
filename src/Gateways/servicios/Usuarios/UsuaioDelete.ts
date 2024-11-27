import dotenv from 'dotenv';
import { Request, Response } from 'express';
import axios from 'axios';

dotenv.config()

export async function UsuarioDelete(req: Request, res: Response) {
    const usuario = process.env.USUARIOS_SERVICE_URL||"http://localhost:3000/api/v1/usuarios"
    const uuid = req.params.uuid
    try {
        if(!uuid){
            throw('No se encontro un id')
        }

        const respuesta = await axios.delete(`${usuario}/${uuid}`);
        res.status(respuesta.status).send(respuesta.data)
    } catch (error: any) {
        res.status(error.response?.status || 500).send({
            error: "Error procesando la solicitud en el Gateway.",
            detalles: error.response?.data || error,
        });
    }
}