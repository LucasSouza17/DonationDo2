import { Request, Response} from 'express';
import knex from '../../../database/connection';
import bcrypt from 'bcryptjs';

class SessionController {
  
  async create (request: Request, response:Response){
    
    try{
      const {Email, Senha} = request.body;
    
      const doador = await knex('doador')
        .where({Email})
        .select('*')
        .first();
      
       const CofimarcaoSenha = bcrypt.compareSync(Senha, doador.Senha);
      
       if(!doador){
        return response.status(400).json({error: 'Usuário não encontrado'});       
      }
       
       if(!CofimarcaoSenha){
        return response.status(400).json({error: 'Senha Incorreta'});
       }
   
      return response.json({...doador, Senha: Senha});
    }
    catch(erro){
      return response.status(500).json({erro});
    } 
  }
}

export default SessionController;