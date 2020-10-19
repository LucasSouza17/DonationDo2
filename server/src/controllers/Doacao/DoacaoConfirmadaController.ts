import {Request, Response} from 'express';
import knex from '../../database/connection';
import MedalhasDoadorController from '../Doador/MedalhasDoadorController';

const medalhasDoadorController = new MedalhasDoadorController();

class DoacaoConfirmadaController{
  
  async update (request: Request, response:Response){
    
    try {
      const {id} = request.params;
    
      const Status = "Doação concluida";
      
      await knex('doacao').update('Status', Status).where('id_Doacao', id);
      
      const Pontuacao_Doador = await knex('doacao')
        .where('id_Doacao', id)
        .join('doador', 'id_Doador', '=', 'cod_Doador')
        .select('doador.Pontuacao', 'id_Doador').first();
      
      const Pontuacao = Number(Pontuacao_Doador.Pontuacao) + 10;
      const id_Doador = Number(Pontuacao_Doador.id_Doador);
      
      medalhasDoadorController.index(response, Pontuacao, id_Doador);
      
      await knex('doacao').where('id_Doacao', id)
        .join('doador', 'id_Doador', '=', 'cod_Doador')
        .update('Pontuacao', Pontuacao);
      
      return response.status(200).json({success: 'Doação Confirmada'});
    }
    catch(erro){
      return response.status(500).json({erro});
    }
    
  }
  
}

export default DoacaoConfirmadaController;

