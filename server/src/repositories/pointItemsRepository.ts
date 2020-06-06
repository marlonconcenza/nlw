import connection from '../database/connection';
import Knex from 'knex';
import PointItem from '../models/PointItem';

export default class PointItemsRepository {

    private trx: Knex.Transaction<any, any>;

    constructor(trx: Knex.Transaction<any, any>) {
        this.trx = trx;
    }

    async add(items: PointItem[]) {

        if (!this.trx) {
            this.trx = await connection.transaction();
            
        }

        await this.trx('point_items').insert(items);
    }

    async commit() {
        if (this.trx) {
            await this.trx.commit();
        }
    }
}