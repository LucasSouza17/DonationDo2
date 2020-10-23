import express from 'express';
import path from 'path'
import routes from './routes';
import { errors } from 'celebrate';
import cors from 'cors';
 
const app = express();

const options: cors.CorsOptions = {
  allowedHeaders: ["Origin", "Access-Control-Allow-Origin", "Access-Control-Expose-Headers", "X-Requested-With", "Content-Type, X-Total-Count", "Accept", "X-Access-Token", "X-Total-Count",  "Authorization"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: 'http://localhost:3000',
  preflightContinue: true,
  exposedHeaders: "x-total-count"
};

app.use(cors(options));
app.options("*", cors(options));
 
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
 
app.use(errors());
 
app.listen(3333);