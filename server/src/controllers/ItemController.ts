import { Request, Response} from 'express';
import knex from '../database/connection';

class ItemController {
  
  async index (request: Request, response:Response){
    
    const itens = await knex('item').select('*');
  
    const serializedItens = itens.map(itens => {
      return {
        id: itens.id_Item,
        Nome: itens.Nome,
        image_url: `http://localhost:3333/uploads/${itens.Icone}`,
      };
    });
  
    return response.json(serializedItens);
  }
}

export default ItemController;