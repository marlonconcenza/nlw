import knex from '../database/connection';
import Point from '../models/Point';
import Item from '../models/Item';
import PointItemsRepository from './pointItemsRepository';

export default class PointsRepository {

    async getById(id: number) : Promise<Point> {

        const point = await knex('points').where('id', id).first();

        if (point != null) {

            const items: Item[] = await knex('items')
                .join('point_items', 'items.id', '=', 'point_items.item_id')
                .where('point_items.point_id', id)
                .select('items.id', 'items.image', 'items.title');

            point.items = items;

            // if (items && items.length > 0) {
            //     point.items = items.map((item: Item) => {
            //         return item.id
            //     });
            // }
        }

        return point;
    }

    async get(city: String, uf: String, items: number[]) : Promise<Point[]> {

        let points: Point[] = [];

        if (items && items.length > 0) {

            points = await knex('points')
                .join('point_items', 'points.id', '=', 'point_items.point_id')
                .whereIn('point_items.item_id', items)
                .where('city', String(city))
                .where('uf', String(uf))
                .distinct()
                .select('points.*');

        } else {

            points = await knex('points')
                .where('city', String(city))
                .where('uf', String(uf))
                .distinct()
                .select('*');
        }

        if (points != null && points.length > 0) {

            for (let index = 0; index < points.length; index++) {
                const id = points[index].id;

                const items: Item[] = await knex('items')
                    .join('point_items', 'items.id', '=', 'point_items.item_id')
                    .where('point_items.point_id', id)
                    .select('items.id', 'items.image', 'items.title');
                   
                points[index].items = items;

                // if (items && items.length > 0) {
                //     points[index].items = items.map((item: Item) => {
                //         return item.id
                //     });
                // }
            }
        }

        return points;
    }

    async add(point: Point) : Promise<Point> {

        const trx = await knex.transaction();
    
        try {
    
            const pointRepository = {
                image: point.image,
                name: point.name,
                email: point.email,
                whatsapp: point.whatsapp,
                longitude: point.longitude,
                latitude: point.latitude,
                city: point.city,
                uf: point.uf
            };

            const insertedIds = await trx('points').insert(pointRepository);
    
            point.id = insertedIds[0];
    
            if (point.id > 0 && point.items != null && point.items.length > 0) {

                const pointItems = point.items
                    .map((item: Item) => {
                        return {
                            point_id: point.id,
                            item_id: item.id
                        };
                });

                const pointItemsRepository = new PointItemsRepository(trx);
                await pointItemsRepository.add(pointItems);
            }
    
            await trx.commit();

        } catch (error) {
            console.log(error);
            await trx.rollback();
        }

        return point;
    }
}