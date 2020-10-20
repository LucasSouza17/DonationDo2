import { Request, Response} from 'express';
import knex from '../../database/connection';

class DoadorController{
  
  async index (request: Request, response:Response){
    
    try{
      const { uf, cidade, id_Item } = request.query;
        
      const necessidades = await knex('necessidade')
        .join('receptor', 'id_Receptor', '=', 'cod_Receptor')
        .where('cod_Item', Number(id_Item))
        .where('Cidade', String(cidade))
        .where('UF', String(uf))
        .select('necessidade.*')
      
      return response.json(necessidades);
    }
    catch(erro){
      return response.status(500).json({erro});
    }    
  }
  
  async show (request: Request, response:Response){
    
    try{
      const {id} = request.params;
      const id_Doador = request.headers.authorization;
      
      const receptor =  await knex('necessidade')
        .join('receptor', 'id_Receptor', '=', 'cod_Receptor')
        .where('id_Necessidade', id )
        .select('receptor.*').first();
      
      const serializeReceptor = {
        ...receptor,
         Img_Local: `http://localhost:3333/uploads/${receptor.Img_Local}`
       };
     
      const cod_Doador = id_Doador;
      const cod_Receptor = receptor.id_Receptor;
      const cod_Necessidade = id;

      const now = new Date
      const Data_atual = now.getFullYear() +"/0"+ (now.getMonth() + 1) + "/" +now.getDate ();
     
      const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

      const Data = Data_atual + " " + time;
     
      const historico = {cod_Doador, cod_Receptor, cod_Necessidade, Data};
     
      await knex('historico').insert(historico);
     
      return response.json(serializeReceptor);
    }
    catch(erro){
      return response.status(500).json({erro});
    } 
  }
  
  async update (request: Request, response:Response){
    
    try{
      const { id } = request.params;
    
      const doador = await knex('doador').where('id_Doador', id).first();
      
      if(!doador){
        return response.status(400).json({error: 'Doador não encontrado'});       
      }    

      const { Cidade, UF } = request.body;
    
      await knex('doador').where('id_Doador', id).update({Cidade, UF, Avatar: request.file.filename});
    
      const doador_atualizado= await knex('doador')
        .where('id_Doador', id)
        .select('*')
        .first();
    
      return response.json(doador_atualizado);
    }
    catch(erro){
      return response.status(500).json({erro});
    }
  }
}

export default DoadorController;
