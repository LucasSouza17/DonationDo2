import { Request, Response} from 'express';
import knex from '../../database/connection';
import crypto from 'crypto';

class DoadorOutrosController{
  
  async update (request: Request, response:Response){
    
    try{
      const { id } = request.params;
    
      const doador = await knex('doador').where('id_Doador', id).first();
      
      if(!doador){
        return response.status(400).json({error: 'Doador não encontrado'});       
      }    

      const { Cidade, UF } = request.body;
    
      await knex('doador').where('id_Doador', id).update({Cidade, UF});
    
      const doador_atualizado= await knex('doador')
        .where('id_Doador', id)
        .select('*')
        .first();
    
      return response.json(doador_atualizado);
    }
    catch(erro){
      return response.status(500).json({erro});
    }
  }
}

export default DoadorOutrosController;