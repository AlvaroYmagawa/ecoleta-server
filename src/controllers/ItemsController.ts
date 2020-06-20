// Importing Knex connection from our project
import knex from '../database/connection';
// Importing typing of Request and Response 
import { Request, Response } from 'express';

class ItemsController {
  async index(request: Request, response: Response){
    const items = await knex('items').select('*');
  
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/updloads/${item.image}`
      };
    });
  
    return response.json(serializedItems);
  }
}

export default ItemsController;