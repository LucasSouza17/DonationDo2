import { Request, Response} from 'express';
import knex from '../database/connection';

const dateFormat = require('dateformat');

class FinalizarNecessidadeDataController {
  
async update (request: Request, response:Response){
    
    const { id } = request.params;
    
    const receptor = await knex('receptor').where('id_Receptor', id).first();
    
    if(!receptor){
      return response.status(400).json({error: 'Usuário não encontrado'});       
    }
    
    const now = new Date
    const Data_Atual = now.getFullYear() +"/0"+ (now.getMonth() + 1) + "/" +now.getDate ();       
     
    const necessidades_Finalizadas = await knex('receptor')
    .join('necessidade', 'id_Receptor', '=', 'cod_Receptor')
    .where('necessidade.cod_Receptor', id).andWhere('Data_Final', '<', Data_Atual).andWhere('status', 'Em andamento')
    .select('necessidade.*');
    
    const quantidade_Finalizada = await knex('receptor')
    .join('necessidade', 'id_Receptor', '=', 'cod_Receptor')
    .where('necessidade.cod_Receptor', id).andWhere('Data_Final', '<', Data_Atual).andWhere('status', 'Em andamento')
    .update('status', 'Finalizada').select('necessidades.id_Necessidade')
    
    if(quantidade_Finalizada > 0){
     response.header('X-Total-Count', quantidade_Finalizada);
     return response.json(necessidades_Finalizadas);
    }  
    else{ 
      response.header('X-Total-Count', quantidade_Finalizada);
      return response.status(404).json("Nenhuma Necessidade finalizada");
    }       
  }
}

export default FinalizarNecessidadeDataController;