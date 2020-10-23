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
        .select('doacao.id_Doacao','receptor.Nome as NomeReceptor', 'receptor.Tipo',
           'necessidade.Titulo', 
           'necessidade.Descricao as DescricaoNecessidade',
           'receptor.Cidade', 'receptor.UF', 'receptor.Rua',
           'receptor.Numero', 'receptor.Bairro', 'receptor.Img_Local', 'receptor.Email', 'receptor.Whatsapp', 'receptor.Telefone', 'receptor.Latitude', 'receptor.Longitude', 'doacao.Data', 
           'doacao.Status')
        .orderBy('doacao.Data', 'desc');
    
      const serializeDoacoes = Doacoes.map(doacao => {
        return {      
          ...doacao,
         Data: dateFormat(doacao.Data, "dd/mm/yyyy"),
         image_url: `http://192.168.1.106:3333/uploads/Receptor/${doacao.Img_Local}`
      }});
      
      return response.json(serializeDoacoes);
    }
    catch(erro){
      return response.status(500).json({erro});
    }  
  }    
}

export default HistoricoDoacoesController;
