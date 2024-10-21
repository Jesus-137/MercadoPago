import express from 'express';
import { usuariosRouter } from './Usuarios/infrastructure/UsuariosRouter';
import { clientesRouter } from './Clientes/infrastructure/ClientesRouter';
import { mercadoRouter } from './MercadoPago/insfrastructure/MercadoRouter'; 
import { whatsAppRouter } from './WhatsApp/infrastructure/WhatsApppRouter';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/Api/v1/usuarios', usuariosRouter);
app.use('/Api/v1/clientes', clientesRouter);
app.use('/Api/v1/mercado', mercadoRouter);
app.use('/Api/v1/whatsapp', whatsAppRouter);


const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server online on port ${port}`);
});
