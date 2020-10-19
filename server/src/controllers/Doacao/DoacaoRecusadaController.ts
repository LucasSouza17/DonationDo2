import {Request, Response} from 'express';
import knex from '../../database/connection';

class DoacaoRecusadaController{
  
  async update (request: Request, response:Response){

    try{
      const {id} = request.params;
    
      const Status = "Doação recusada";

      await knex('doacao').update('Status', Status).where('id_Doacao', id);

      return response.status(200).json({success: 'Doação Recusada'});
    }
    catch(erro){
      return response.status(500).json({erro});
    }
  }
}

export default DoacaoRecusadaController;
