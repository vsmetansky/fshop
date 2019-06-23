import { Storage } from './storage'
import Photo from './util/photo'

import mongoose, { Schema, Query } from 'mongoose';

const FlowerSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: Object }
});

export default class Flower extends Storage {
    name: string;
    price: number;
    photo: Photo;

    protected static model: any =  mongoose.model('Flower', FlowerSchema);
    constructor(_name: string, _price: number, _photo: Photo) {
        super();
        this.price = _price;
        this.name = _name;
        this.photo = _photo;
    }
    protected static async populator(items: Query<any>) {
        return await items.sort('-date').exec();
    }
}
