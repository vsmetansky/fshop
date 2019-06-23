import { Storage, StorageCreator } from './storage'

import mongoose, { Schema, Query } from 'mongoose';
import User from './user';

const AdressSchema: Schema = new Schema({
    city: { type: String, required: true },
    office: { type: Number, required: true },
    consumer: { type: Schema.Types.ObjectId, ref: 'User' }
});

class Adress extends Storage {
    city: string;
    office: number;
    consumer: any;

    protected static model = mongoose.model('Adress', AdressSchema);
    constructor(_city: string, _office: number, _consumer: any) {
        super();
        this.city = _city;
        this.office = _office;
        this.consumer = _consumer;
    }
    protected static async populator(items: Query<any>) {
        return await items.populate('consumer').sort('-date').exec();
    }
}

class AdressCreator extends StorageCreator {
    private constructor() { super() }
    static async makeItem(params: any) {
        const adress = await Adress.insert(new Adress(params.city, params.office, params.consumer));
        await this.appendAdress(params.consumer, adress);
        return adress;
    }
    private static async appendAdress(_consumer: any, _adress: any) {
        const consumerPopulated = await User.getById(_consumer);
        consumerPopulated.adresses.push(_adress._id);
        await User.update(consumerPopulated);
    }
}

export {
    Adress,
    AdressCreator
}