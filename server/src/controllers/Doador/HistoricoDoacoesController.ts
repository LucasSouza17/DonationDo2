import { Request, Response} from 'express';
import knex from '../../database/connection';

const dateFormat = require('dateformat');

class HistoricoDoacoesController{
  
  async index (request: Request, response:Response){
    
    try{
      const {id} = request.params;
    
      const Doacoes = await knex('doacao')
        .where('cod_Doador', Number(id))
        .join('necessidade', 'id_Necessidade', '=', 'cod_Necessidade')
        .join('receptor', 'id_Receptor', '=', 'cod_Receptor')
        .join('item', 'id_Item', '=', 'cod_Item')
        .select('receptor.Nome as Nome do Receptor', 'receptor.Tipo',
           'item.Nome as Nome do Item', 
           'necessidade.Descricao as Descrição da Necessidade',
           'receptor.Cidade', 'receptor.UF', 'receptor.Rua',
           'receptor.Numero', 'receptor.Bairro', 'doacao.Data', 
           'doacao.Status')
        .orderBy('doacao.Data', 'desc');
    
      const serializeDoacoes = Doacoes.map(doacao => {
        return {      
          ...doacao,
         Data: dateFormat(doacao.Data, "dd/mm/yyyy"),
      }});
      
      return response.json(serializeDoacoes);
    }
    catch(erro){
      return response.status(500).json({erro});
    }  
  }    
}

export default HistoricoDoacoesController;
