import { Request, Response} from 'express';
import knex from '../database/connection';

class SessionController {
  
  async createReceptor (request: Request, response:Response){
    
    const {Email, Senha} = request.body;
    
    const receptor = await knex('receptor').where({Email, Senha}).select('*').first();
    
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
 
    return response.json(receptor);
  }
  
  async createDoador (request: Request, response:Response){
    
    const {Email, Senha} = request.body;
    
    const doador = await knex('doador').where({Email, Senha}).select('*').first();
    
     if(!doador){
      return response.status(400).json({error: 'Usuário não encontrado'});       
     }
 
      return response.json(doador);
  }
}

export default SessionController;