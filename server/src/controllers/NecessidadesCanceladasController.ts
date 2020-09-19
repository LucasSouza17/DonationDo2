import { Request, Response} from 'express';
import knex from '../database/connection';

const dateFormat = require('dateformat');

class NecessidadesCanceladaController {
  
  async index (request: Request, response: Response){
    const { page = 1} = request.query;
    
    const { id } = request.params;
    
    const receptor = await knex('receptor').where('id_Receptor', id).first();
    
    if(!receptor){
      return response.status(400).json({error: 'Usuário não encontrado'});       
    }
         
    const necessidades_canceladas = await knex('receptor')
     .join('necessidade', 'id_Receptor', '=', 'cod_Receptor')
     .where('necessidade.cod_Receptor', id).andWhere('status', 'Cancelada')
     .limit(10)
     .offset((Number(page) - 1) * 10)
     .select('necessidade.*');
     
     const [count] = await knex('necessidade')
     .where('cod_Receptor', id).andWhere('status', 'Cancelada')
     .count('*');
      
    response.header('X-Total-Count', String(count['count(*)']) );

    const serializeNecessidade = necessidades_canceladas.map(necessidade => {
      return {
        ...necessidade,
        Data_Inicio: dateFormat(necessidade.Data_Inicio, "dd/mm/yyyy"),
        Data_Final: dateFormat(necessidade.Data_Final, "dd/mm/yyyy"),
      }
    })

    return response.json(serializeNecessidade);

  }
  
  async update (request: Request, response:Response){
    
    const { id } = request.params;
    
    const necessidade = await knex('necessidade').where('id_Necessidade', id).first();
    
    if(!necessidade){
      return response.status(400).json({error: 'Necessidade não encontrado'});       
    }    
    
    await knex('necessidade').where('id_Necessidade', id).update('status', 'Cancelada');
   
    const necessidade_cancelada = await knex('necessidade').where('id_Necessidade', id).select('*').first();
   
    const serializeNecessidade = {
      ...necessidade_cancelada,
       Data_Inicio: dateFormat(necessidade_cancelada.Data_Inicio, "dd/mm/yyyy"),
       Data_Final: dateFormat(necessidade_cancelada.Data_Final, "dd/mm/yyyy")
       };
    
    return response.json(serializeNecessidade);
  }
}

export default NecessidadesCanceladaController;