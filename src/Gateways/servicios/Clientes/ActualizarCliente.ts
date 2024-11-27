import dotenv from 'dotenv';
import { Request, Response } from 'express';
import axios from 'axios';

dotenv.config();

export async function ActualizarCliente(req: Request, res:Response) {
    const usuarios = process.env.CLIENTES_SERVICE_URL||"http://localhost:3000/api/v1/clientes"
    const {nombre, password, generos, tipo, ubicacion, tipo_evento} = req.body
    const uuid = req.params.uuid;
    const caractristicas =  [
        /^[^0-9]*$/,//nombre
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,//generos
        /^(solista|banda)$/i,//tipo
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,//ubicacion
        /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/,//tipo_evento
        /^(?=.*[A-Z])(?=.*[#*\-_!¡])[A-Za-z0-9#*\-_!¡]{8,}$/,
      ];
    try {
        if(!nombre&&!password&&!generos&&!tipo&&!ubicacion&&!tipo_evento){
            throw('Flatan campos')
        }

        if(!uuid){
            throw('No se encontro el id')
        }

        const contenido = [nombre, generos, tipo, ubicacion, tipo_evento, password];
        const nombres = ['nombre', 'generos', 'tipo', 'ubicacion', 'tipo_evento', 'password'];

        for (let index = 0; index < caractristicas.length; index++) {
            if(!caractristicas[index].test(contenido[index])){
                throw(`${nombres[index]} no valido`);
            }
        }

        const body = {
            'nombre': nombre,
            'generos': generos,
            'tipo': tipo,
            'ubicaion': ubicacion,
            'tipo_evento': tipo_evento,
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