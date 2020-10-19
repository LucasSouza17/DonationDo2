import { Request, Response} from 'express';
import knex from '../../database/connection';

class MedalhaController{
  
  async create (request: Request, response:Response){

    try{
      const {Nome, Pontos, Descricao} = request.body; 
    
      const medalha = await knex('medalha').insert({Nome, Pontos, Descricao});
      
      return response.json(medalha);
    }
    catch(erro){
      return response.status(500).json({erro});
    }      
  }    
}

export default MedalhaController;
