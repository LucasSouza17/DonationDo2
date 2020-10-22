import { Request, Response} from 'express';
import knex from '../../database/connection';

class necessidadeDoadorController{
  
  async index (request: Request, response:Response){
    
    try{
      const { UF, Cidade, id_Item } = request.query;
        
      const necessidades = await knex('necessidade')
        .join('receptor', 'necessidade.cod_Receptor', '=', 'receptor.id_Receptor')
        .where('cod_Item', Number(id_Item))
        .where('Cidade', String(Cidade))
        .where('UF', String(UF))
        .distinct()
        .select('necessidade.*', 'receptor.Img_Local', 'receptor.Nome')
        .first();

        const serializeNecessidades = {
          ...necessidades,
           Img_Local: `http://192.168.1.106:3333/uploads/${necessidades.Img_Local}`
         };
      
      return response.json(serializeNecessidades);
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
         Img_Local: `http://192.168.1.106:3333/uploads/${receptor.Img_Local}`
       };
     
      const cod_Doador = id_Doador;
      const cod_Receptor = receptor.id_Receptor;
      const cod_Necessidade = id;

      const now = new Date
      const Data_atual = now.getFullYear() +"/0"+ (now.getMonth() + 1) + "/" +now.getDate ();
     
      const time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

      const DataTime = Data_atual + " " + time;
     
      const historico = {cod_Doador, cod_Receptor, cod_Necessidade, DataTime};
     
      await knex('historico').insert(historico);
     
      return response.json(serializeReceptor);
    }
    catch(erro){
      return response.status(500).json({erro});
    } 
  }
}

export default necessidadeDoadorController;
