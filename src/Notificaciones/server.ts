import express from 'express';
import { whatsAppRouter } from './src/WhatsApp/infrastructure/WhatsApppRouter';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/Api/v1/whatsapp', whatsAppRouter);


const port = 3002;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server online on port ${port}`);
});
