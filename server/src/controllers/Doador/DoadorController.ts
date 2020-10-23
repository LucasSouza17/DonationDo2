import { Request, Response} from 'express';
import knex from '../../database/connection';
import crypto from 'crypto';
import { any } from '@hapi/joi';

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

      const doadorData = await knex('doador').where('id_Doador', '=', id_doador).first();

      await knex('medalha_doador')
        .insert({'cod_Doador': id_doador, 'cod_Medalha': 1});

      return response.json(doadorData);
    }
    catch(erro){
      return response.status(500).json({erro});
    }
  }
  
  async show (request: Request, response:Response){
    
    try{
      const { id_Doador } = request.params;
      
      const doador =  await knex('doador')
        .where('id_Doador', id_Doador )
        .select('*')
        .first();
        
        const serializeDoador = {
            ...doador,
            avatar_url: `http://192.168.1.106:3333/uploads/Doador/${doador.Avatar}`
        };
     
      return response.json(serializeDoador);
    }
    catch(erro){
      return response.json(erro);
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
