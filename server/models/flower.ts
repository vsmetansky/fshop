import { Storage } from './storage'
import Photo from './util/photo'
import Dimension from './util/dimension';
import TLevel from './util/tlevel';

import mongoose, { Schema, Query } from 'mongoose';

const FlowerSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    info: { type: String },
    dimension: { type: Object },
    temperature: { type: Object },
    photo: { type: Object }
});

class Flower extends Storage {
    name: string;
    price: number;
    photo: Photo | undefined;
    info: string;
    dimension: Dimension | undefined;
    temperature: TLevel | undefined;

    protected static model: any = mongoose.model('Flower', FlowerSchema);
    constructor(builder: FlowerBuilder) {
        super();
        this.name = builder.name;
        this.price = builder.price;
        this.photo = builder.photo;
        this.info = builder.info;
        this.dimension = builder.dimension;
        this.temperature = builder.temperature;
    }
    protected static async populator(items: Query<any>) {
        return await items.sort('-date').exec();
    }
}

class FlowerBuilder {
    name: string = '';
    price: number = 0;
    photo: Photo | undefined = undefined;
    info: string = '';
    dimension: Dimension | undefined = undefined;
    temperature: TLevel | undefined = undefined;

    buildName(_name: string) {
        this.name = _name;
        return this;
    }
    buildPrice(_price: number) {
        this.price = _price;
        return this;
    }
    buildPhoto(_photo: Photo) {
        this.photo = _photo;
        return this;
    }
    buildInfo(_info: string) {
        this.info = _info;
        return this;
    }
    buildDim(_dimension: Dimension) {
        this.dimension = _dimension;
        return this;
    }
    buildTemp(_temperature: TLevel) {
        this.temperature = _temperature;
        return this;
    }
    build() {
        return new Flower(this);
    }
}

class FlowerBuilderDirector {
    private builder: FlowerBuilder;
    constructor(_builder: FlowerBuilder) {
        this.builder = _builder;
    }
    makeFlower() {
        return this.builder.build();
    }
}   

export {
    Flower,
    FlowerBuilder,
    FlowerBuilderDirector
}
