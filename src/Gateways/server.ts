import express, { Request, Response, NextFunction } from "express";
import { buscar } from "./buscar";
import { LoginCliente } from "./LoginCliente";
import { LoginUsuario } from "./LoginUsuario";
import { RegistroUsuario } from "./RegistroUsuario";
import { RegistroCliente } from "./RegistroCliente";
import { Contacto } from "./Contacto";

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

app.post("/buscar", buscar);

app.get('/clientes', LoginCliente)

app.get('/usuarios', LoginUsuario)

app.post('/usuarios', RegistroUsuario);

app.post('/clientes', RegistroCliente);

app.post('/contacto', Contacto)

app.use((req, res) => {
    res.status(404).send({ error: "Ruta no encontrada en el Gateway." });
});

const PORT = process.env.GATEWAY_PORT || 3006;
app.listen(PORT, () => {
    console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});
