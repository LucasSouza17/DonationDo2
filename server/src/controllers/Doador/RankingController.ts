import { Request, Response} from 'express';
import knex from '../../database/connection';

class RankingController{
  
  async index (request: Request, response:Response){
    
    try{
      const { page = 1} = request.query;
    
      const ranking = await knex('doador')
        .orderBy('Pontuacao', 'desc')
        .limit(10)
        .offset((Number(page) - 1) * 10)
        .select('*');
       
      const [count] = await knex('doador')
        .select('*').count('*');
        
      response.header('X-Total-Count', String(count['count(*)']) );
      
      return response.json(ranking);
    }
    catch(erro){
      return response.status(500).json({erro});
    }        
  }    
}

export default RankingController;
