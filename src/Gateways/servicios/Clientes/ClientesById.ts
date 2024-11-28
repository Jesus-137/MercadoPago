import dotenv from 'dotenv';
import { Request, Response } from 'express';
import axios from 'axios';
import { Leads_Nombre } from '../../../ValueObjects/Leads_Nombre'; 
import { Leads_Telefono } from '../../../ValueObjects/Leads_telefono';

dotenv.config()

export async function ClienteById(req: Request, res: Response) {
    const usuarios = process.env.CLIENTES_SERVICE_URL||"http://localhost:3000/api/v1/clientes"
    try {
        const uuid = req.params.uuid;
        if(!uuid){
            throw('no se detecto un id en la url')
        }

        const respuesta = await axios.get(`${usuarios}/${uuid}`);
        if(Object.keys(respuesta.data.data).length === 0){
            throw('No se encontro al cliente')
        }
        console.log(respuesta.data.data.id_lead)
        respuesta.data.data.username = await new Leads_Nombre().get(respuesta.data.data.id_lead)
        respuesta.data.data.telefono = await new Leads_Telefono().get(respuesta.data.data.id_lead)
        res.status(respuesta.status).send(respuesta.data)
    } catch (error: any) {
        res.status(error.response?.status || 500).send({
            error: "Error procesando la solicitud en el Gateway.",
            detalles: error.response?.data || error,
        });
    }
}