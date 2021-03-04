import express from 'express';
import path from 'path'
import routes from './routes';
import { errors } from 'celebrate';
import cors from 'cors';
 
const app = express();

app.use(cors());
app.options("*", cors());
 
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
 
app.use(errors());
 
app.listen(process.env.PORT || 3333);