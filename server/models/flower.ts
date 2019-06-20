import Storage from './storage'
import Photo from './util/photo'

import mongoose, { Schema } from 'mongoose';

const FlowerSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: Object }
});

export default class Flower extends Storage {
    name: string;
    price: number;
    photo: Photo;
    constructor(_name: string, _price: number, _photo: Photo) {
        super();
        this.price = _price;
        this.name = _name;
        this.photo = _photo;
    }
    protected static get model() {
        return FlowerModel;
    }
    protected static async populator(items: any) {
        return items.sort('-date').exec();
    }
}

const FlowerModel = mongoose.model('Flower', FlowerSchema);
