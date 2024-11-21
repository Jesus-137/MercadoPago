import express, { Request, Response } from 'express';
import { HttpServiceAdapter } from './src/infrastructure/adaptadores/http';
import { ExecuteUseCase } from './src/aplication/ExecuteUseCase';

const app = express();
const PORT = 3006;

app.use(express.json());

// Configurar adaptadores para microservicios
const service1Adapter = new HttpServiceAdapter('http://localhost:3005');
const service2Adapter = new HttpServiceAdapter('http://localhost:3002');

// Crear casos de uso
const service1Handler = new ExecuteUseCase(service1Adapter);
const service2Handler = new ExecuteUseCase(service2Adapter);

// Rutas
app.all('/tokens/*', async (req: Request, res: Response) => {
  try {
    const data = await service1Handler.handleRequest(req);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

app.all('/whatsapp/*', async (req, res) => {
  try {
    const data = await service2Handler.handleRequest(req);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

app.listen(PORT, () => console.log(`API Gateway running on ${PORT}`));
