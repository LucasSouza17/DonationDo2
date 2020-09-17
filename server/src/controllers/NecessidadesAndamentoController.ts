import { Request, Response} from 'express';
import knex from '../database/connection';

const dateFormat = require('dateformat');

class NecessidadesAndamentoController {
  
  async index (request: Request, response: Response){
    const { page = 1} = request.query;
    
    const { id } = request.params;
    
    const receptor = await knex('receptor').where('id_Receptor', id).first();
    
    if(!receptor){
      return response.status(400).json({error: 'Usuário não encontrado'});       
    }
    
    const necessidades_andamento = await knex('receptor')
     .join('necessidade', 'id_Receptor', '=', 'cod_Receptor')
     .where('necessidade.cod_Receptor', id).andWhere('status', 'Em andamento')
     .limit(10)
     .offset((Number(page) - 1) * 10)
     .select('necessidade.*');
     
     const [count] = await knex('necessidade')
     .where('cod_Receptor', id).andWhere('status', 'Em andamento')
     .count('*');
      
    response.header('X-Total-Count', String(count['count(*)']) );
      
    return response.json(necessidades_andamento);
  }
  
  async update (request: Request, response:Response){
    
    const { id } = request.params;
    
    const necessidade = await knex('necessidade').where('id_Necessidade', id).first();
    
    if(!necessidade){
      return response.status(400).json({error: 'Necessidade não encontrado'});       
    }    
    
    const {Descricao, cod_Item, Data_Final} = request.body;
    
    const NomeItem = await knex('item').where('id_Item', cod_Item).select('Nome').first();
    
    const Titulo = "Precisamos de " + NomeItem.Nome; 
   
    await knex('necessidade').where('id_Necessidade', id).update({cod_Item, Titulo, Descricao, Data_Final});
   
    const necessidade_atualizada = await knex('necessidade').where('id_Necessidade', id).select('*').first();
   
    const serializeNecessidade = {
      ...necessidade_atualizada,
       Data_Inicio: dateFormat(necessidade_atualizada.Data_Inicio, "dd/mm/yyyy"),
       Data_Final: dateFormat(necessidade_atualizada.Data_Final, "dd/mm/yyyy")
       };
    
    return response.json(serializeNecessidade);
  }
}

export default NecessidadesAndamentoController;