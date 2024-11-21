import express from 'express';
import cors from 'cors';
import { RouterTokens } from './src/auth/insfrastructure/RouterTokens';

const app = express();
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/tokens', RouterTokens);

const port = 3005;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server online on port ${port}`);
});
