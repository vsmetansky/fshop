import Storage from './storage'
import User from './user';

import mongoose, { Schema } from 'mongoose';

const OrderSchema: Schema = new Schema({
    number: { type: Number, required: true, unique: true },
    consumer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    adress: { type: Schema.Types.ObjectId, ref: 'Adress', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Flower', required: true }]
});

class Order extends Storage {
    number: number;
    consumer: any;
    adress: any;
    items: any[] = [];
    constructor(_number: number, _consumer: any) {
        super();
        this.number = _number;
        this.consumer = _consumer;
    }
    protected static get model() {
        return OrderModel;
    }
    protected static async populator(items: any) {
        return items.populate('items').populate('adress').populate('consumer').sort('-date').exec();
    }
}

const OrderModel = mongoose.model('Order', OrderSchema);

class OrderFactory {
    static nextOrderNum: number = -1;
    private constructor() { }

    static async makeNewOrder(_consumer: User) {
        if (this.nextOrderNum === -1) {
            this.nextOrderNum = await this.initNextOrderNum();
        }
        return new Order(this.nextOrderNum++, _consumer);
    }

    private static async initNextOrderNum() {
        const orders = await this.getSortedOrders();
        const ordersLen = orders.length;
        if (ordersLen > 0) {
            return orders[ordersLen - 1].number + 1;
        }
        return 0;
    }

    private static async getSortedOrders() {
        const orders = await Order.getAll();
        orders.sort((a: Order, b: Order) => a.number - b.number);
        return orders;
    }
}

export {
    Order,
    OrderFactory
}