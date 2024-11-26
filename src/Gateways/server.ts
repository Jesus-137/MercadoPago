import express, { Request, Response, NextFunction } from "express";
import axios from "axios"; // Para redirigir solicitudes al backend
import dotenv from "dotenv"; // Para cargar configuración desde .env
import { extraerInformacion } from "./ExtraerInfo";

dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const routes = {
    clientes: process.env.CLIENTES_SERVICE_URL || "http://localhost:3000/api/v1/clientes",
    usuarios: process.env.USUARIOS_SERVICE_URL || "http://localhost:3000/api/v1/usuarios",
    leads: process.env.LEADS_SERVICE_URL || "http://localhost:3000/api/v1/leads"
};

app.post("/buscar", async (req: Request, res: Response) => {
    try {
        const { texto } = req.body;

        if (!texto) {
            return res.status(400).send({ error: "El parámetro 'texto' es obligatorio." });
        }

        const filtros = extraerInformacion(texto as string);

        const respuesta = await axios.get(routes.clientes, {
            params: filtros,
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
  } catch (error: any) {
    res.status(error.response?.status || 500).send({
      error: "Error procesando la solicitud en el Gateway.",
      detalles: error.response?.data || error.message,
    });
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
  } catch (error:any) {
    res.status(error.response?.status || 500).send({
      error: "Error procesando la solicitud en el Gateway.",
      detalles: error.response?.data || error.message,
    });
  }
})

app.post('/usuarios',async (req: Request, res:Response)=>{
  const caractristicas =  [
    /^(?=.*[A-Z])(?=.*[#*\-_!¡])[A-Za-z0-9#*\-_!¡]{8,}$/,//password
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,//nombre
    /^\d{10}$/,//telefono
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, //correo
  
  ];
  const {nombre, password, id_lead, telefono, correo, sendBy} = req.body;
  try {
    if(!nombre&&!password&&!id_lead&&!telefono&&!correo&&sendBy){
      throw('Faltan campos')
    }

    const constenido = [password, nombre, telefono, correo]
    const nombres = ['password', 'nombre', 'telefono', 'correo']

    for (let index = 0; index < caractristicas.length; index++) {
      if(!caractristicas[index].test(constenido[index])){
        throw(`${nombres[index]} no valido`)
      }
    }

    if (sendBy!='whatsapp'&&sendBy!='correo'){
      throw('No se difinio por donde enviar el token')
    }

    const body = {
      'nombre': nombre,
      'password': password,
      'telefono': telefono,
      'correo': correo,
      'id_lead': id_lead,
      'sendBy': sendBy
    }

    const respuesta = await axios.post(routes.usuarios, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.status(respuesta.status).send(respuesta.data)
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).send({ data: error.response.data });
    } else if (error.request) {
      res.status(503).send({ error: 'No se obtuvo respuesta del servidor externo' });
    } else {
      res.status(400).send({ error: error.message || error });
    }
  }
});

app.post('/clientes',async (req: Request, res:Response)=>{
  const caractristicas =  [
    /^[^0-9]*$/,//nombre
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,//generos
    /^(solista|banda)$/i,//tipo
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,//ubicacion
    /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/,//tipo_evento
    /^(?=.*[A-Z])(?=.*[#*\-_!¡])[A-Za-z0-9#*\-_!¡]{8,}$/,//password
    /^\d{10}$/,//telefono
  ];
  const {id_lead, nombre, generos, tipo, ubicacion, tipo_evento, password, telefono} = req.body;
  try {
    if(!nombre&&!password&&!id_lead&&!telefono&&!generos&&!tipo&&!ubicacion&&!tipo_evento){
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
      'tipo_evento': tipo_evento,
      'password': password,
      'telefono': telefono
    }
    const respuesta = await axios.post(routes.clientes, body, {
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
});

app.post('/contacto', async (req:Request, res:Response)=>{
  const {username, telefono, correo, sendBy} = req.body;
  try {
    const caracteristicas = [
      /^[a-zA-Z0-9]+$/,//username
      /^\d{10}$/,//telefono
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, //correo
    ]
    if(!username&&!telefono&&!correo){
      throw('Faltan campos')
    }

    if(sendBy!='whatsapp'&&sendBy!='correo'){
      throw('no se especifico por donde mandar el mensaje')
    }

    const contenido = [
      username,
      telefono,
      correo
    ]

    const nombres = [
      'username',
      'telefono',
      'correo',
    ]

    for (let index = 0; index < caracteristicas.length; index++) {
      if(!caracteristicas[index].test(contenido[index])){
        throw(`${nombres[index]} no valido`)
      }
    }

    const body = {
      'username': username,
      'telefono': telefono,
      'correo': correo,
      'sendBy': sendBy
    }

    const respuesta = await axios.post(routes.leads, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(respuesta.status).send(respuesta.data)
  } catch (error: any) {
    res.status(error.response?.status || 500).send({
      error: "Error procesando la solicitud en el Gateway.",
      detalles: error.response?.data || error.message,
    });
  }
})

app.use((req, res) => {
    res.status(404).send({ error: "Ruta no encontrada en el Gateway." });
});

const PORT = process.env.GATEWAY_PORT || 3006;
app.listen(PORT, () => {
    console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});
