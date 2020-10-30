import { Request, Response} from 'express';
import knex from '../../database/connection';

const dateFormat = require('dateformat');

class HistoricorDoacoesReceptoController{
  
  async index (request: Request, response:Response){
    
    try{
      const {id} = request.params;
    
      const { page = 1} = request.query;
      
      const Doacoes = await knex('doacao')
        .where('doacao.Status', '<>','Doação pendente')
        .join('necessidade', 'id_Necessidade', '=', 'cod_Necessidade')
        .where('cod_Receptor', Number(id))
        .join('item', 'id_Item', '=', 'cod_Item')
        .join('doador', 'id_Doador', '=', 'cod_Doador')
        .limit(10)
        .offset((Number(page) - 1) * 10)
        .orderBy('id_Doacao', 'desc')
        .select('doacao.*', 'necessidade.Titulo',
          'doador.Nome as Nomedodoador');
      
      const [count] = await knex('doacao')
        .where('doacao.Status', '<>','Doação pendente')
        .join('necessidade', 'id_Necessidade', '=', 'cod_Necessidade')
        .where('cod_Receptor', Number(id))
        .count('*');
       
      response.header('X-Total-Count', String(count['count(*)']) );
      
      const serializeDoacoes = Doacoes.map(doacao =>{
        
        let Status = "Confirmada";
        
        if(doacao.Status !== "Doação concluida"){
          Status = "Recusada";
        } 
        return{
          ...doacao,
          Data: dateFormat(doacao.Data, "dd/mm/yyyy"),
          Status
        }
      });
  
      return response.json(serializeDoacoes);
    }
    catch(erro){
      return response.status(500).json({erro});
    } 
  }    
}

export default HistoricorDoacoesReceptoController;
