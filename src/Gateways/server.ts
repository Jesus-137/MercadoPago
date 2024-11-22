import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 3006;

// Configurar rutas para microservicios
app.use(
  '/service1',
  createProxyMiddleware({
    target: 'http://localhost:3005', // URL del microservicio 1
    changeOrigin: true, // Cambiar el encabezado Host al del servidor objetivo
    pathRewrite: { '^/service1': '/tokens' }, // Reescribir el path eliminando "/service1"
  })
);

app.use(
  '/service2',
  createProxyMiddleware({
    target: 'http://localhost:3002', // URL del microservicio 2
    changeOrigin: true,
    pathRewrite: { '^/service2': '/whatsapp' },
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway running on ${PORT}`);
});
