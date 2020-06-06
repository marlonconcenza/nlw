import { Request, Response } from 'express';
import PointRepository from '../repositories/pointsRepository';
import Point from '../models/Point';

class PointsController {

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        let parsedItems: number[] = [];

        if (items) {
            parsedItems = String(items)
                .split(',')
                .map(item => Number(item.trim()));
        }

        const pointRepository = new PointRepository();
        const points = await pointRepository.get(String(city), String(uf), parsedItems);

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image: `http://192.168.0.31:3333/uploads/imageUploads/${point.image}`
            };
        });

        return response.send(serializedPoints);
    }

    async show(request: Request, response: Response) {
        const pointRepository = new PointRepository();
        const point = await pointRepository.getById(Number(request.params.id));

        if (!point) {
            return response.status(404).json({ message: 'Point not found.' });
        }

        const serializedPoint = {
            ...point,
            image: `http://192.168.0.31:3333/uploads/imageUploads/${point.image}`
        };

        return response.send(serializedPoint);
    }

    async create(request: Request, response: Response) {

        const items = request.body
                        .items
                        .split(',')
                        .map((item: string) => Number(item.trim()))
                        .map((item : number) => ({ id: item }));

        const point: Point = {
            id: 0,
            image: request.file.filename,
            name: request.body.name,
            email: request.body.email,
            whatsapp: request.body.whatsapp,
            latitude: request.body.latitude,
            longitude: request.body.longitude,
            city: request.body.city,
            uf: request.body.uf,
            items
        };

        const pointRepository = new PointRepository();
        await pointRepository.add(point);

        return response.json(point);
    }
}

export default PointsController;