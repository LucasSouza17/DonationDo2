import { Request, Response} from 'express';
import knex from '../../database/connection';

class PontuacaoController{
  
  async index (request: Request, response:Response){
    
    try{
      const id = request.headers.authorization;
    
      const Pontos = await knex('doador')
      .where('id_Doador', Number(id)).select('Pontuacao').first();
      
      const Medalhas = await knex('medalha_doador')
      .where('cod_Doador', Number(id))
      .join('medalha', 'cod_Medalha', '=', 'id_Medalha')
      .select('medalha.*').orderBy('id_Medalha', 'asc');
      
      return response.json({Pontos, Medalhas});
    }
    catch(erro){
       return response.status(500).json({erro});
    } 
  }    
}

export default PontuacaoController;
