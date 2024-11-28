import dotenv from 'dotenv'
import { Request, Response } from "express";
import { extraerInformacion } from "./ExtraerInfo";
import axios from "axios";

dotenv.config();

export async function buscar (req: Request, res: Response) {
    try {
        const { texto } = req.body;
        console.log(texto)
        const clientes = process.env.CLIENTES_SERVICE_URL || "http://localhost:3000/api/v1/clientes"
        if (!texto) {
            return res.status(400).send({ error: "El parámetro 'texto' es obligatorio." });
        }

        const filtros = extraerInformacion(texto as string);

        const respuesta = await axios.get(clientes, {
            params: filtros,
        });

        res.status(respuesta.status).send(respuesta.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).send({
            error: "Error procesando la solicitud en el Gateway.",
            detalles: error.response?.data || error.message,
        });
    }
}