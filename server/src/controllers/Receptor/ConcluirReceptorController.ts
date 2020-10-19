import { Request, Response} from 'express';
import knex from '../../database/connection';

class ConcluirReceptorController {
  
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
        Rua, Bairro, CEP, Latitude, Longitude, 
        Img_Local: request.file.filename}
       
      await knex('receptor').where('id_Receptor', id).update(receptor);
      
      return response.json({...receptor});
    }
    catch(erro){
      return response.status(500).json({erro});
    }   
  } 
}

export default ConcluirReceptorController;
