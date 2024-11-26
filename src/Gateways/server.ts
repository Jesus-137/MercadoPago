import express, { Request, Response, NextFunction } from "express";
import axios from "axios"; // Para redirigir solicitudes al backend
import dotenv from "dotenv"; // Para cargar configuración desde .env
import { extraerInformacion } from "./ExtraerInfo";

dotenv.config();

const caractristicas =  [
  /^(?=.*[A-Z])(?=.*[#*\-_!¡])[A-Za-z0-9#*\-_!¡]{8,}$/,//password
  /^[^0-9]*$/,//nombre
  /^\d{10}$/,//telefono
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, //correo

];

const app = express();
app.use(express.json());

// Middleware para habilitar CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});

// Middleware para logging
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rutas hacia microservicios
const routes = {
    clientes: process.env.CLIENTES_SERVICE_URL || "http://localhost:3000/api/v1/clientes",
    usuarios: process.env.USUARIOS_SERVICE_URL || "http://localhost:3000/api/v1/usuarios",
};

// Endpoints del Gateway

// Ejemplo de ruta para el microservicio de clientes con filtros
app.post("/buscar", async (req: Request, res: Response) => {
    try {
        const { texto } = req.body;

        if (!texto) {
            return res.status(400).send({ error: "El parámetro 'texto' es obligatorio." });
        }

        // Extraer información del texto
        const filtros = extraerInformacion(texto as string);

        // Hacer la solicitud al microservicio de clientes con los filtros extraídos
        const respuesta = await axios.get(routes.clientes, {
            params: filtros, // Pasar los filtros como query params
        });

        res.status(respuesta.status).send(respuesta.data);
    } catch (error: any) {
        console.error(error);
        res.status(error.response?.status || 500).send({
            error: "Error procesando la solicitud en el Gateway.",
            detalles: error.response?.data || error.message,
        });
    }
});

app.get('/clientes', async (req: Request, res:Response)=>{
  const {nombre, password} = req.query;
  try {
    if(!nombre){
      throw('Se necesita un nombre');
    }

    if(!password){
      throw('Se necesita una contraseña')
    }

    const params = {'nombre': nombre, 'password': password}

    const respuesta = await axios.get(routes.clientes, {
      params: params,
    })
    res.status(respuesta.status).send(respuesta.data)
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msn: error
    })
  }
})

app.get('/usuarios', async (req: Request, res:Response)=>{
  const {nombre, password} = req.query;
  try {
    if(!nombre){
      throw('Se necesita un nombre');
    }

    if(!password){
      throw('Se necesita una contraseña')
    }

    const params = {'nombre': nombre, 'password': password}
    const respuesta = await axios.get(routes.usuarios, {
      params: params,
    })
    res.status(respuesta.status).send(respuesta.data)
  } catch (error) {
    res.status(400).send({
      status: "Error",
      msn: error
    })
  }
})

app.post('/usuarios',async (req: Request, res:Response)=>{
  const {nombre, password, id_lead, telefono, correo, sendBy} = req.body;
  try {
    if(!nombre&&!password&&!id_lead&&!telefono&&!correo&&sendBy){
      throw('Faltan campos')
    }

    const body = {
      'nombre': nombre,
      'password': password,
      'telefono': telefono,
      'correo': correo,
      'id_lead': id_lead,
      'sendBy': sendBy
    }

    const constenido = [password, nombre, telefono, correo]
    const nombres = ['password', 'nombre', 'telefono', 'correo']

    for (let index = 0; index < caractristicas.length; index++) {
      if(!caractristicas[index].test(constenido[index])){
        throw(`${nombres[index]} no valido`)
      }
    }

    if (sendBy!='whatsapp'||sendBy!='correo'){
      throw('No se difinio por donde enviar el token')
    }

    const respuesta = await axios.post(routes.usuarios,{
      body: body
    })
    res.status(respuesta.status).send(respuesta.data)
  } catch (error) {
    res.status(400).send({error: error})
  }
})

// Middleware para manejar rutas no existentes
app.use((req, res) => {
    res.status(404).send({ error: "Ruta no encontrada en el Gateway." });
});

// Iniciar el Gateway
const PORT = process.env.GATEWAY_PORT || 3006;
app.listen(PORT, () => {
    console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});
