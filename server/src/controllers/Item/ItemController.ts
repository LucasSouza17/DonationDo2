import { Request, Response} from 'express';
import knex from '../../database/connection';

class ItemController {
  
  async index (request: Request, response:Response){
    
    try{
      const itens = await knex('item').select('*');
  
      const serializedItens = itens.map(item => {
        return {
          id: item.id_Item,
          Nome: item.Nome,
          image_url: `http://localhost:3333/uploads/${item.Icone}`,
          image_mob: `http://192.168.1.106:3333/uploads/${item.Icone}`,
        };
      });
    
      return response.json(serializedItens);
    }
    catch(erro){
      return response.status(500).json({erro});
    }   
  }
}

export default ItemController;