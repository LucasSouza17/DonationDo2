import { Request, Response } from 'express';
import knex from '../../database/connection';

const dateFormat = require('dateformat');

class NecessidadeOutrosController {

  async create(request: Request, response: Response) {
    
    try {
      const { cod_Receptor } = request.params;
      const { Descricao, cod_Item, Data_Final, NomeItem } = request.body;
  
      const Titulo = "Precisamos de " + NomeItem;
      const Status = "Em andamento";
  
      const now = new Date
      const Data_Inicio = now.getFullYear() + "/0" + (now.getMonth() + 1) + "/" + now.getDate();
  
      const necessidade = {
        cod_Receptor, cod_Item, Titulo, Descricao, Status,
        Data_Inicio, Data_Final
      };
  
      await knex('necessidade').insert(necessidade);
  
      const serializeNecessidade = {
        ...necessidade,
        Data_Inicio: dateFormat(necessidade.Data_Inicio, "dd/mm/yyyy"),
        Data_Final: dateFormat(necessidade.Data_Final, "dd/mm/yyyy")
      };
  
      response.json(serializeNecessidade);
    }
    catch(erro){
      return response.status(500).json({erro});
    }
    
  }
}

export default NecessidadeOutrosController;