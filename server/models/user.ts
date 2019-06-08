import mongoose, { Schema } from 'mongoose';

import Storage from './storage'

const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    adresses: [{ type: Schema.Types.ObjectId, ref: 'Adress' }]
});

export default class User extends Storage {
    email: string;
    password: string;
    fullname: string;
    admin: boolean;
    orders: any[] = [];
    adresses: any[] = [];

    constructor(_email: string = '', _password: string = '', _fullname: string = '', _admin: boolean = false) {
        super();
        this.email = _email;
        this.password = _password;
        this.fullname = _fullname;
        this.admin = _admin;
    }
    protected static get model() {
        return UserModel;
    }
    protected static async populator(items: any) {
        return items.populate('orders').populate('adresses').sort('-date').exec();
    }
}

const UserModel = mongoose.model('User', UserSchema);

//use fckn builder
