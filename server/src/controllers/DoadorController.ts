import { Request, Response} from 'express';
import knex from '../database/connection';

class DoadorController{
  
  async create (request: Request, response:Response){
    
    const {Nome, Email, Senha, Whatsapp, Cidade, UF } = request.body;
    
    const doador = {Nome, Email, Senha, Whatsapp, Cidade, UF };
    
    const doador_verificado = await knex('doador').where({Email, Nome}).select('*').first();
    
    if(doador_verificado != null){
     return response.status(422).json({error: 'Usuário já cadastrado'});
    }
     
    if(doador.Senha.length < 8){
      return response.status(422).json({error: 'A senha tem que possuir mais de 8 Caracteres'});
    }
     
    await knex('doador').insert(doador);
    
    return response.json({...doador});
    
  }
  
  async index (request: Request, response:Response){
    
    const { cod_Item } = request.params;
        
    const necessidades = await knex('necessidade')
    .where('cod_Item', cod_Item )
    .select('*')
    
    return response.json(necessidades);    
  }
  
  async show (request: Request, response:Response){
    
    const { id } = request.params;
    
    const receptor =  await knex('necessidade')
    .join('receptor', 'id_Receptor', '=', 'cod_Receptor')
    .where('id_Necessidade', id )
    .select('receptor.*').first();
    
    const serializeReceptor = {
      ...receptor,
       Img_Local: `http://192.168.0.50:3333/uploads/${receptor.Img_Local}`
     };
    
    return response.json(serializeReceptor);
  }
  
  async update (request: Request, response:Response){
    
    const { id } = request.params;
    
    const doador = await knex('doador').where('id_Doador', id).first();
    
    if(!doador){
      return response.status(400).json({error: 'Doador não encontrado'});       
    }    
    
    const {Nome, Email, Senha, Whatsapp, Cidade, UF } = request.body;
   
    await knex('doador').where('id_Doador', id).update({Nome, Email, Senha, Whatsapp, Cidade, UF });
   
    const doador_atualizada = await knex('doador').where('id_Doador', id).select('*');
   
    return response.json(doador_atualizada);
    
  }
}

export default DoadorController;
