import { Request, Response} from 'express';
import knex from '../../database/connection';

const dateFormat = require('dateformat');

class DoacaoReceptorController{
  
  async index (request: Request, response:Response){
    
    try{
      const {id} = request.params;
    
      const Doacoes = await knex('doacao')
        .where('doacao.Status', 'Doação pendente')
        .join('necessidade', 'id_Necessidade', '=', 'cod_Necessidade')
        .where('cod_Receptor', Number(id))
        .join('item', 'id_Item', '=', 'cod_Item')
        .join('doador', 'id_Doador', '=', 'cod_Doador')
        .select('doacao.*',
          'doador.Nome as Nomedodoador', 'necessidade.Titulo')
        .orderBy('id_Doacao', 'desc');
      
      const serializeDoacoes = Doacoes.map(doacao =>{
        return{
          ...doacao,
          Data: dateFormat(doacao.Data, "dd/mm/yyyy"),
        }
      });
  
      return response.json(serializeDoacoes);
    }
    catch(erro){
      return response.status(500).json({erro});
    }
  }   
}

export default DoacaoReceptorController;
