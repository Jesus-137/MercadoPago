import express, { Request, Response, NextFunction } from "express";
import { buscar } from "../servicios/Clientes/buscar"; 
import { LoginCliente } from "../servicios/Clientes/LoginCliente";
import { LoginUsuario } from "../servicios/Usuarios/LoginUsuario";
import { RegistroUsuario } from "../servicios/Usuarios/RegistroUsuario";
import { RegistroCliente } from "../servicios/Clientes/RegistroCliente";
import { Contacto } from "../servicios/Contactos/Contacto";
import { UsuarioById } from "../servicios/Usuarios/UsuarioById";
import { UsuarioDelete } from "../servicios/Usuarios/UsuaioDelete";
import { ActualizarUsuario } from "../servicios/Usuarios/ActualizarUsuario";
import { ClienteDelete } from "../servicios/Clientes/ClienteDelete";
import { ActualizarCliente } from "../servicios/Clientes/ActualizarCliente";
import { ClienteById } from "../servicios/Clientes/ClientesById";

export const RutaServicios = express.Router()

RutaServicios.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

RutaServicios.get('/clientes', LoginCliente)
RutaServicios.get('/usuarios', LoginUsuario)
RutaServicios.get('/usuarios/:uuid', UsuarioById);
RutaServicios.get('/clientes/:uuid', ClienteById)
RutaServicios.post("/buscar", buscar);
RutaServicios.post('/usuarios', RegistroUsuario);
RutaServicios.post('/clientes', RegistroCliente);
RutaServicios.post('/contacto', Contacto);
RutaServicios.delete('/usuarios/:uuid', UsuarioDelete);
RutaServicios.delete('/clientes/:uuid', ClienteDelete);
RutaServicios.put('/usuarios/:uuid', ActualizarUsuario);
RutaServicios.put('/clientes', ActualizarCliente)