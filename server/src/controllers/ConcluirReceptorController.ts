import { Request, Response } from 'express';
import knex from '../database/connection';

class ConcluirReceptorController {

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const { Email, Senha } = await knex('receptor').where('id_Receptor', id).select('Email', 'Senha').first();

    const { Nome, Whatsapp, Telefone,
      DescricaoReceptor, Tipo, Cidade, UF, Numero,
      Rua, Bairro, CEP, Latitude, Longitude, Img_Local = request.file.filename
    } = request.body;


    const receptor = {
      Nome, Email, Senha, Whatsapp, Telefone,
      DescricaoReceptor, Tipo, Cidade, UF, Numero,
      Rua, Bairro, CEP, Latitude, Longitude, Img_Local
    }
    await knex('receptor').where('id_Receptor', id).update(receptor);

    return response.json({ ...receptor });
  }
}

export default ConcluirReceptorController;
