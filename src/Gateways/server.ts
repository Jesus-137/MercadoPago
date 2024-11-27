import express, { Request, Response, NextFunction } from "express";
import { RutaServicios } from "./rutas/RutaServicios";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Clientes_Id } from "../ValueObjects/Cliente_id";

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

app.use('/api/v1', RutaServicios)
async function validateUuidMiddleware(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
  
    try {
        const cliente_id = await new Clientes_Id().get(uuid);
        if(cliente_id==null){
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        req.body.id_cliente = cliente_id;
        return next()
    } catch (error) {
      console.error('Error validando el UUID:', error);
      return res.status(500).json({ error: 'Error interno al validar el cliente' });
    }
}
  
const publicacionesProxy = createProxyMiddleware({
    target: 'http://localhost:3000', // URL del microservicio de publicaciones
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1/clientes/:uuid/publicaciones': '/api/v1/clientes/:uuid/publicaciones', // Reescribe la ruta eliminando el prefijo
    },
    onProxyReq: (proxyReq, req) => {
      // Asegurarse de que el cuerpo modificado sea enviado al microservicio
      if (req.body) {
        console.log(req.body)
        const bodyData = JSON.stringify(req.body);
  
        // Reescribir el cuerpo de la solicitud
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
        proxyReq.end();
      }
    },
});

app.use('/api/v1/clientes/:uuid/publicaciones', validateUuidMiddleware, publicacionesProxy);

app.use((req, res) => {
    res.status(404).send({ error: "Ruta no encontrada en el Gateway." });
});

const PORT = 3006;
app.listen(PORT, () => {
    console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});
