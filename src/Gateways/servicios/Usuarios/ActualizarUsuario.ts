import dotenv from 'dotenv';
import { Request, Response } from 'express';
import axios from 'axios';

dotenv.config();

export async function ActualizarUsuario(req: Request, res:Response) {
    const usuarios = process.env.USUARIOS_SERVICE_URL||"http://localhost:3000/api/v1/usuarios"
    const {nombre, password} = req.body
    const uuid = req.params.uuid;
    const caractristicas =  [
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,//nombre
        /^(?=.*[A-Z])(?=.*[#*\-_!¡])[A-Za-z0-9#*\-_!¡]{8,}$/,//password
    ];
    try {
        if(!nombre&&!password){
            throw('Flatan campos')
        }
        if(!uuid){
            throw('No se encontro el id')
        }

        const contenido = [nombre, password];
        const nombres = ['nombre', 'password'];

        for (let index = 0; index < caractristicas.length; index++) {
            if(!caractristicas[index].test(contenido[index])){
                throw(`${nombres[index]} no valido`);
            }
        }

        const body = {
            'nombre': nombre,
            'password': password
        }
        const respuesta = await axios.put(`${usuarios}/${uuid}`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        res.status(respuesta.status).send(respuesta.data);
    } catch (error: any){
        res.status(error.response?.status || 500).send({
            error: "Error procesando la solicitud en el Gateway.",
            detalles: error.response?.data || error,
        });
    }
}