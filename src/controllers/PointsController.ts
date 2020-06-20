// Importing Knex connection from our project
import knex from '../database/connection';
// Importing typing of Request and Response 
import { Request, Response } from 'express';

class PointsController {
  async create(request: Request, response: Response){
    const {
      name, 
      email, 
      whatsapp, 
      latitude,
      longitude, 
      city, 
      uf,
      items } = request.body;
  
      // Transaction deal with querys that depends of another query
      const trx = await knex.transaction();

      const point = {
        image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        name, 
        email, 
        whatsapp, 
        latitude,
        longitude, 
        city,
        uf
      }
  
      // Knex after insert a new item inside a Table return an array with the IDs
      // of that table updated
      const pointsIds =  await trx('points').insert(point);
  
      // The index is 0, because the new point inserted in table will be in the
      // begin of the array
      const point_id = pointsIds[0];
  
      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id,
        }
      })
  
      // Insert item inside pointItems table to create a relation
      await trx('point_items').insert(pointItems);
      
      // Transaction update database only has no errors
      await trx.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }

  async show(request: Request, response: Response){
    const { id } = request.params;

    // Method first() will return the first case that id is the same as body id
    const point = await knex('points').where('id', id).first();

    if(!point) {
      return response.status(400).json({ message: 'Point not found'});
    }

    // Return all items that has a relation with the item that has been
    // created
    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    return response.json({ point, items });
  }

  async index(request: Request, response: Response){
    const { city, uf, items } = request.query;

    // This will return a array of items Id numbers
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', "=", "point_items.point_id")
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return response.json(points);
  }
}

export default PointsController;