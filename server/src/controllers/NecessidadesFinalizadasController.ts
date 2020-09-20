import { Request, Response} from 'express';
import knex from '../database/connection';

const dateFormat = require('dateformat');

class NecessidadesFinalizadaController {
  
  async index (request: Request, response: Response){
    
    const { page = 1} = request.query;
    
    const { id } = request.params;
    
    const receptor = await knex('receptor').where('id_Receptor', id).first();
    
    if(!receptor){
      return response.status(400).json({error: 'Usuário não encontrado'});       
    }
         
    const necessidades_finalizadas = await knex('receptor')
     .join('necessidade', 'id_Receptor', '=', 'cod_Receptor')
     .where('necessidade.cod_Receptor', id).andWhere('status', 'Finalizada')
     .limit(5)
     .offset((Number(page) - 1) * 5)
     .orderBy('necessidade.id_Necessidade', 'desc')
     .select('necessidade.*');
     
     const [count] = await knex('necessidade')
     .where('cod_Receptor', id).andWhere('status', 'Finalizada')
     .count('*');
      
    response.header('X-Total-Count', String(count['count(*)']) );

    const serializeNecessidade = necessidades_finalizadas.map(necessidade => {
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
    
    await knex('necessidade').where('id_Necessidade', id).update('status', 'Finalizada');
   
    const necessidade_finalizada = await knex('necessidade').where('id_Necessidade', id).select('*').first();
   
    const serializeNecessidade = {
      ...necessidade_finalizada,
       Data_Inicio: dateFormat(necessidade_finalizada.Data_Inicio, "dd/mm/yyyy"),
       Data_Final: dateFormat(necessidade_finalizada.Data_Final, "dd/mm/yyyy")
       };
    
    return response.json(serializeNecessidade);
  }
}

export default NecessidadesFinalizadaController;