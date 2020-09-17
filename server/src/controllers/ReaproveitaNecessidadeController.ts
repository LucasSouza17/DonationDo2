import { Request, Response} from 'express';
import knex from '../database/connection';

const dateFormat = require('dateformat');

class ReaproveitaNecessidadeController {
  
async create (request: Request, response:Response){
    
  const {id} = request.params;
  
  const {cod_Receptor, cod_Item, Titulo, Descricao, Status} = await knex('necessidade').where('id_Necessidade', id).select('cod_Receptor', 'cod_Item', 'Titulo', 'Descricao', 'Status').first();
  
  const {Data_Final} = request.body;
  
  const now = new Date
  const Data_Inicio = now.getFullYear() +"/0"+ (now.getMonth() + 1) + "/" +now.getDate ();
  
  const necessidade_reaproveitada = {cod_Receptor, cod_Item, Titulo, Descricao, Status, 
    Data_Inicio, Data_Final};
  
  await knex('necessidade').insert(necessidade_reaproveitada);
  const serializeNecessidade = {
    ...necessidade_reaproveitada,
     Data_Inicio: dateFormat(necessidade_reaproveitada.Data_Inicio, "dd/mm/yyyy"),
     Data_Final: dateFormat(necessidade_reaproveitada.Data_Final, "dd/mm/yyyy")
     };
  
    response.json(serializeNecessidade);
  }
}

export default ReaproveitaNecessidadeController;