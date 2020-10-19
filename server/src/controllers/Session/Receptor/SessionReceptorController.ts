import { Request, Response} from 'express';
import knex from '../../../database/connection';

class SessionController {
  
  async create (request: Request, response:Response){
    
    try{
      const {Email, Senha} = request.body;
    
      const receptor = await knex('receptor')
        .where({Email, Senha})
        .select('*')
        .first();
      
      if(!receptor){
        return response.status(400).json({error: 'Usuário não encontrado'});       
      }
      
      const Nome = receptor.Nome;
      
      let Status;
      
      if(!Nome){
        Status = "Cadastro em andamento";
      }
      else{
        Status = "Cadastro concluido";
      }
   
      return response.json([{receptor}, {Status}]);
    }
    catch(erro){
      return response.status(500).json({erro});
    } 
  }
}

export default SessionController;