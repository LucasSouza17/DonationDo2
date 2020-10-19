import { Response} from 'express';
import knex from '../../database/connection';

class MedalhasDoadorController{
  
  async index ( response:Response, Pontuacao:Number, id_Doador:Number){
    
    try{
      const medalhas = await knex('medalha_doador')
        .where('cod_Doador', id_Doador)
        .select('cod_Medalha');
      
      if(Pontuacao >= 50 && Pontuacao < 80){

        if((medalhas.find( medalha => medalha.cod_Medalha === 2))){  
          return null;
        }

        await knex('medalha_doador')
          .insert({'cod_Doador': id_Doador, 'cod_Medalha': 2});     
      }
      
      if(Pontuacao >= 80 && Pontuacao < 110){

        if((medalhas.find( medalha => medalha.cod_Medalha === 3))){       
          return null;
        }
         
        await knex('medalha_doador')
          .insert({'cod_Doador': id_Doador, 'cod_Medalha': 3});
      }
      
      if(Pontuacao >= 110 && Pontuacao < 140){

        if((medalhas.find( medalha => medalha.cod_Medalha === 4))){
          return null;
        } 
        
        await knex('medalha_doador')
          .insert({'cod_Doador': id_Doador, 'cod_Medalha': 4});        
      }
      
      if(Pontuacao >= 140){

        if((medalhas.find( medalha => medalha.cod_Medalha === 5))){
          return null;
        }
        
        await knex('medalha_doador')
          .insert({'cod_Doador': id_Doador, 'cod_Medalha': 5});         
      }
    }
    catch(erro){
      return response.status(500).json({erro});
    }
  }  
}  

export default MedalhasDoadorController;
