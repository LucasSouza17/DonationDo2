import { Request, Response } from 'express';
import knex from '../../database/connection';

const dateFormat = require('dateformat');

class NecessidadesController {

  async create(request: Request, response: Response) {

    try {
      const { cod_Receptor } = request.params;
      const { Descricao, cod_Item, Data_Final } = request.body;

      const NomeItem = await knex('item').where('id_Item', cod_Item).select('Nome').first();

      const Titulo = "Precisamos de " + NomeItem.Nome;
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
    catch (erro) {
      return response.status(500).json({ erro });
    }
  }

  async index(request: Request, response: Response) {

    try {
      const { id } = request.params;

      const necessidade = await knex('necessidade').where('id_Necessidade', id).select('*').first();

      const serializeReceptor = {
        ...necessidade,
        Data_Inicio: dateFormat(necessidade.Data_Inicio, "isoDate"),
        Data_Final: dateFormat(necessidade.Data_Final, "isoDate")
      };

      return response.json(serializeReceptor);
    }
    catch (erro) {
      return response.status(500).json({ erro });
    }
  }

  async show(request: Request, response: Response) {

    try {
      const { id } = request.params;

      const necessidade = await knex('necessidade').where('id_Necessidade', id).select('*').first();

      const serializeReceptor = {
        ...necessidade,
        Data_Inicio: dateFormat(necessidade.Data_Inicio, "dd/mm/yyyy"),
        Data_Final: dateFormat(necessidade.Data_Final, "dd/mm/yyyy")
      };

      return response.json(serializeReceptor);
    }
    catch (erro) {
      return response.status(500).json({ erro });
    }
  }
}

export default NecessidadesController;