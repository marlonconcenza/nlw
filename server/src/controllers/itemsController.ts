import { Request, Response } from 'express';
import knex from '../database/connection';
import ItemsRepository from '../repositories/itemsRepository';

class ItemsController {
    async index(request: Request, response: Response) {
        
        const itemsRepository = new ItemsRepository();
        const items = await itemsRepository.getAll();

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image: `http://192.168.0.14:3333/uploads/${item.image}`
            };
        });
    
        return response.json(serializedItems);
    }
}

export default ItemsController;