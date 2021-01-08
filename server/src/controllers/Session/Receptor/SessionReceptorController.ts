import { Request, Response} from 'express';
import knex from '../../../database/connection';
import bcrypt from 'bcryptjs';

class SessionController {
  
  async create (request: Request, response:Response){
    
    try{
      const {Email, Senha} = request.body;
    
      const receptor = await knex('receptor')
        .where({Email})
        .select('*')
        .first();
      
      const CofimarcaoSenha = bcrypt.compareSync(Senha, receptor.Senha);
        
      if(!receptor){
        return response.status(400).json({error: 'Usuário não encontrado'});       
      }
      
      if(!CofimarcaoSenha){
        return response.status(400).json({error: 'Senha Incorreta'});
      }
      
      const Nome = receptor.Nome;
      
      let Status;
      
      if(!Nome){
        Status = "Cadastro em andamento";
      }
      else{
        Status = "Cadastro concluido";
      }
   
      return response.json(receptor);
    }
    catch(erro){
      return response.status(500).json({erro});
    } 
  }
}

export default SessionController;