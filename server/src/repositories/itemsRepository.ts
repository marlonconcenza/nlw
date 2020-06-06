import knex from '../database/connection';
import Item from '../models/Item';

export default class ItemsRepository {
    async getAll() : Promise<Item[]> {
        return await knex('items').select('*');
    }
}