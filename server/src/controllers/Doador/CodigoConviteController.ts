import { Request, Response} from 'express';
import knex from '../../database/connection';

import MedalhasDoadorController from '../Doador/MedalhasDoadorController';

const medalhasDoadorController = new MedalhasDoadorController();

class CodigoConviteController{
  
  async show (request: Request, response:Response){
    
    try{
      const id = request.headers.authorization;
      
      const {Codigo_Convite} = request.body;
      const Doador_Convidante = await knex('doador')
        .where('Codigo_Convite', Codigo_Convite)
        .select('*')
        .first();

      const Doador_Convidado = await knex('doador')
        .where('id_Doador', Number(id)).andWhere('Cupom', "")
        .select('*')
        .first();

      if(!Doador_Convidante){
        return response.status(400).json({error: 'Código inválido'});
      }

      if(!Doador_Convidado){
        return response.status(400).json({error: 'Cupom já utilizado'});
      }

      const PontuacaoDoador_Convidante = Doador_Convidante.Pontuacao + 50;

      const PontuacaoDoador_Convidado =Doador_Convidado.Pontuacao + 25;

      const id_Convidante = Number(Doador_Convidante.id_Doador);
      const id_Convidado = Number(Doador_Convidado.id_Doador);

      //enviando a pontuação para verificar se ganhou medalhas
      medalhasDoadorController.index(response, PontuacaoDoador_Convidante,id_Convidante);
      medalhasDoadorController.index(response, PontuacaoDoador_Convidado, id_Convidado);

      await knex('doador').update('Pontuacao', PontuacaoDoador_Convidante)
        .where('Codigo_Convite', Codigo_Convite);

      await knex('doador')
        .update({'Pontuacao': PontuacaoDoador_Convidado,'Cupom': Codigo_Convite})
        .where('id_Doador', Number(id)).select('*');  

      return response.status(200).json({success: 'Parabéns você acaba de ganhar 25 pontos'});
    }
    catch(erro){
      return response.status(500).json({erro});
    }
  }   
}

export default CodigoConviteController;