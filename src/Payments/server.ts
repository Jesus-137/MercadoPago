import express from 'express';
import { mercadoRouter } from './src/MercadoPago/insfrastructure/MercadoRouter';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/Api/v1/mercado', mercadoRouter);


const port = 3001;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server online on port ${port}`);
});
