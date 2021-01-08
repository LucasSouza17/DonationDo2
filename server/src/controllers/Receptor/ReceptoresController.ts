import { Request, Response} from 'express';
import knex from '../../database/connection';
import bcrypt from 'bcryptjs';

class ReceptoresController {
  
  async create (request: Request, response:Response){
    
    try{
      const {Email, Senha} = request.body;
     
      const receptor = {Email, Senha}
      
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(Senha, salt);
      
      const receptor_verificado = await knex('receptor').where({Email}).select('*').first();
      
      if(receptor_verificado != null){
        return response.status(422).json({error: 'Usuário já cadastrado'});
      }
       
      await knex('receptor').insert({...receptor, Senha: hash});
      
      return response.json({...receptor, Senha: Senha});
    }
    catch(erro){
      return response.status(500).json({erro});
    }   
  }
  
  async index (request: Request, response:Response){
    
    try{
      const receptores = await knex('receptor').select('*');
    
      const serializeReceptor = receptores.map(receptor => {
        return {
          ...receptor,
          //Img_Local: `http://donationdo-com.umbler.net/uploads/${receptor.Img_Local}`
          Img_Local: `http://localhost:3333/uploads/Receptor/${receptor.Img_Local}`
        };
      });
         
      return response.json(serializeReceptor);
    }
    catch(erro){
      return response.status(500).json({erro});
    }   
  }
  
  async show (request: Request, response:Response){
    
    try{
      const { id } = request.params;
    
      const receptor = await knex('receptor').where('id_Receptor', id).select('*').first();
      
      const serializeReceptor = {
        ...receptor,
         //Img_Local: `http://donationdo-com.umbler.net/uploads/${receptor.Img_Local}`
         Img_Local: `http://localhost:3333/uploads/Receptor/${receptor.Img_Local}`
         };
         
      return response.json(serializeReceptor);
    }
    catch(erro){
      return response.status(500).json({erro});
    } 
  }
  
  async update (request: Request, response:Response){
    
    try{
      const { id } = request.params;
    
      const {Email, Senha} = await knex('receptor').where('id_Receptor', id).select('Email', 'Senha').first();
       
      const {Nome, Whatsapp, Telefone, 
        DescricaoReceptor, Tipo, Cidade, UF, Numero, 
        Rua, Bairro, CEP, Latitude, Longitude
      } = request.body;
  
      const receptor = {Nome, Email, Senha, Whatsapp, Telefone, 
        DescricaoReceptor, Tipo, Cidade, UF, Numero, 
        Rua, Bairro, CEP, Latitude, Longitude
      }
      
      await knex('receptor').where('id_Receptor', id).update(receptor);
   
      return response.json({...receptor});
    }
    catch(erro){
      return response.status(500).json({erro});
    } 
  }
}

export default ReceptoresController;
