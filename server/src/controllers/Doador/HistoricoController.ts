import { Request, Response} from 'express';
import knex from '../../database/connection';

class HistoricoController{
  
  async index (request: Request, response:Response){
    try{
      const { id_doador } = request.params;
    
      const historico_receptores = await knex('historico')
        .where('cod_Doador', id_doador )
        .join('receptor', 'id_Receptor', '=', 'cod_Receptor')
        .select('receptor.*', 'DataTime').count('id_Receptor as Acesso')
        .groupBy('id_Receptor')
        .orderBy('Acesso', "desc");
      
      return response.json(historico_receptores);
    }
    catch(erro){
      return response.status(500).json({erro});
    }   
  }  
  
  async show (request: Request, response: Response){
    
    try{
      const {cod_Receptor} = request.params;
      const id_doador  = request.headers.authorization;
      
      const historico_necessidades = await knex('historico')
        .where('cod_Doador', String(id_doador))
        .join('necessidade', 'id_Necessidade', '=', 'cod_Necessidade')
        .andWhere('historico.cod_Receptor', String(cod_Receptor))
        .orderBy('Data', 'desc')
        .select('necessidade.*')
        .distinct();
  
      return response.json(historico_necessidades);
    }
    catch(erro){
      return response.status(500).json({erro});
    }   
  }
}

export default HistoricoController;
