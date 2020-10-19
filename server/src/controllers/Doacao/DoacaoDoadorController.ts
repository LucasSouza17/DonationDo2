import { Request, Response} from 'express';
import knex from '../../database/connection';

class DoacaoDoadorController{
  
  async create (request: Request, response:Response){
    
    try{
      const {id} = request.params;
      const id_Doador = request.headers.authorization;
      
      const Status = "Doação pendente";
      
      const now = new Date
      const Data = now.getFullYear() +"/0"+ (now.getMonth() + 1) + "/" +now.getDate (); 
    
      const doar = {cod_Necessidade: Number(id), cod_Doador: Number(id_Doador), Status, Data};
      
      await knex('doacao').insert(doar);
          
      return response.json(doar);
    }
    catch(erro){
      return response.status(500).json({erro});
    }
  }
}

export default DoacaoDoadorController;
