import { date } from '@hapi/joi';
import { Request, Response } from 'express';
import knex from '../database/connection';

const dateFormat = require('dateformat');

class NecessidadesController {

  async index(request: Request, response: Response) {

    const { id } = request.params;

    const necessidade = await knex('necessidade').where('id_Necessidade', id).select('*').first();

    const serializeReceptor = {
      ...necessidade,
      Data_Inicio: dateFormat(necessidade.Data_Inicio, "isoDate"),
      Data_Final: dateFormat(necessidade.Data_Final, "isoDate")
    };

    return response.json(serializeReceptor);
  }

  async create(request: Request, response: Response) {

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

  async createif(request: Request, response: Response) {
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
}

export default NecessidadesController;