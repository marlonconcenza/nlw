import Item from './Item';

export default interface Point {
    id: number;
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    longitude: number;
    latitude: number;
    city: string;
    uf: string;
    items: Item[];
}