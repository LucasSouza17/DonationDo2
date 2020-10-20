import { Request, Response} from 'express';
import knex from '../../database/connection';
import crypto from 'crypto';

class DoadorController{
  
  async create (request: Request, response:Response){
    
    try{
      const {Nome, Email, Senha, Cidade, UF } = request.body;
    
      const Pontuacao = 0;
      
      const Codigo_Convite = crypto.randomBytes(4).toString('hex');
      
      const doador = {Nome, Email, Senha, Cidade, UF, Pontuacao, Codigo_Convite };    
      
      const doador_verificado = await knex('doador').where({Email, Nome}).select('*').first();
      
      if(doador_verificado != null){
       return response.status(422).json({error: 'Usuário já cadastrado'});
      }

      if(doador.Senha.length < 8){
        return response.status(422).json({error: 'A senha tem que possuir mais de 8 Caracteres'});
      }

      const id_doador = await knex('doador').insert(doador);

      await knex('medalha_doador')
        .insert({'cod_Doador': id_doador, 'cod_Medalha': 1});

      return response.json({...doador});
    }
    catch(erro){
      return response.status(500).json({erro});
    }
  }
  
  async show (request: Request, response:Response){
    
    try{
      const {id} = request.params;
      
      const doador =  await knex('doador')
        .where('id_Doador', id )
        .select('*').first();
     
      return response.json(doador);
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
