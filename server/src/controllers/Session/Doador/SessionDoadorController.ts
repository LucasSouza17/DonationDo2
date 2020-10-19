import { Request, Response} from 'express';
import knex from '../../../database/connection';

class SessionController {
  
  async create (request: Request, response:Response){
    
    try{
      const {Email, Senha} = request.body;
    
      const doador = await knex('doador')
        .where({Email, Senha})
        .select('*')
        .first();
      
       if(!doador){
        return response.status(400).json({error: 'Usuário não encontrado'});       
      }
   
      return response.json(doador);
    }
    catch(erro){
      return response.status(500).json({erro});
    } 
  }
}

export default SessionController;