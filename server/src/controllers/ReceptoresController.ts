import { Request, Response } from 'express';
import knex from '../database/connection';

class ReceptoresController {

  async create(request: Request, response: Response) {

    const { Email, Senha } = request.body;

    const receptor = { Email, Senha }

    const receptor_verificado = await knex('receptor').where({ Email }).select('*').first();

    if (receptor_verificado != null) {
      return response.status(422).json({ error: 'Usuário já cadastrado' });
    }

    await knex('receptor').insert(receptor);

    return response.json({ ...receptor });
  }

  async index(request: Request, response: Response) {

    const receptores = await knex('receptor').select('*');

    const serializeReceptor = receptores.map(receptor => {
        return {
          ...receptor,
          //Img_Local: `http://donationdo-com.umbler.net/uploads/${receptor.Img_Local}`
          Img_Local: `http://localhost:3333/uploads/${receptor.Img_Local}`
        };
    });

    return response.json(serializeReceptor);
  }

  async show(request: Request, response: Response) {

    const { id } = request.params;

    const receptor = await knex('receptor').where('id_Receptor', id).select('*').first();

    const serializeReceptor = {
      ...receptor,
      //Img_Local: `http://donationdo-com.umbler.net/uploads/${receptor.Img_Local}`
      Img_Local: `http://localhost:3333/uploads/${receptor.Img_Local}`
    };

    return response.json(serializeReceptor);
  }

  async update(request: Request, response: Response) {

    const { id } = request.params;

    const { Email, Senha } = await knex('receptor').where('id_Receptor', id).select('Email', 'Senha').first();

    const { Nome, Whatsapp, Telefone,
      DescricaoReceptor, Tipo, Cidade, UF, Numero,
      Rua, Bairro, CEP, Latitude, Longitude
    } = request.body;

    const receptor = {
      Nome, Email, Senha, Whatsapp, Telefone,
      DescricaoReceptor, Tipo, Cidade, UF, Numero,
      Rua, Bairro, CEP, Latitude, Longitude, Img_Local: request.file.filename
    }

    await knex('receptor').where('id_Receptor', id).update(receptor);

    console.log(receptor);

    return response.json({ ...receptor });
  }

}

export default ReceptoresController;
