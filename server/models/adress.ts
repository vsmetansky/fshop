import Storage from './storage'

import mongoose, { Schema } from 'mongoose';

const AdressSchema: Schema = new Schema({
    city: { type: String, required: true },
    office: { type: Number, required: true },
    consumer: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default class Adress extends Storage {
    city: string;
    office: number;
    consumer: any;
    constructor(_city: string, _office: number, _consumer: any) {
        super();
        this.city = _city;
        this.office = _office;
        this.consumer = _consumer;
    }
    protected static get model() {
        return AdressModel;
    }
    protected static async populator(items: any) {
        return items.populate('consumer').sort('-date').exec();
    }
}

const AdressModel = mongoose.model('Adress', AdressSchema);