import dotenv from 'dotenv';
import { Request, Response } from 'express';
import axios from 'axios';

dotenv.config()

export async function RegistroCliente (req: Request, res:Response){
    const clientes = process.env.CLIENTES_SERVICE_URL || "http://localhost:3000/api/v1/clientes"
    const caractristicas =  [
      /^[^0-9]*$/,//nombre
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,//generos
      /^(solista|banda)$/i,//tipo
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,//ubicacion
      /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/,//tipo_evento
      /^(?=.*[A-Z])(?=.*[#*\-_!¡])[A-Za-z0-9#*\-_!¡]{8,}$/,//password
      /^\d{10}$/,//telefono
    ];
    const {id_lead, foto_perfil, nombre, generos, tipo, ubicacion, tipo_evento, password, telefono} = req.body;
    try {
      if(!nombre&&!foto_perfil&&!password&&!id_lead&&!telefono&&!generos&&!tipo&&!ubicacion&&!tipo_evento){
        throw('Faltan campos')
      }
  
      const constenido = [
        nombre,
        generos,
        tipo,
        ubicacion,
        tipo_evento, 
        password, 
        telefono, 
      ]
      const nombres = [
        'nombre',
        'generos',
        'tipo',
        'ubicacion',
        'tipo_evento', 
        'password', 
        'telefono', 
      ]
  
      for (let index = 0; index < caractristicas.length; index++) {
        if(!caractristicas[index].test(constenido[index])){
          throw(`${nombres[index]} no valido`)
        }
      }
      const body = {
        'id_lead': id_lead,
        'nombre': nombre,
        'generos': generos,
        'tipo': tipo,
        'ubicacion': ubicacion,
        'foto_perfil': foto_perfil,
        'tipo_evento': tipo_evento,
        'password': password,
        'telefono': telefono
      }
      const respuesta = await axios.post(clientes, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.status(respuesta.status).send({data:respuesta.data})
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