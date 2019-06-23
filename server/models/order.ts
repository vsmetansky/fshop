import { Storage, StorageCreator } from './storage'
import User from './user';

import mongoose, { Schema, Query } from 'mongoose';

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

    protected static model: any = mongoose.model('Order', OrderSchema);
    constructor(_number: number, _consumer: any, _adress: any, _items: any[]) {
        super();
        this.number = _number;
        this.consumer = _consumer;
        this.adress = _adress;
        _items.forEach(i => this.items.push(i));
    }
    protected static async populator(items: Query<any>) {
        return await items.populate('items').populate('adress').populate('consumer').sort('-date').exec();
    }
}

class OrderCreator extends StorageCreator {
    static nextOrderNum: number = -1;
    private constructor() { super() }
    static async makeItem(params: any) {
        if (this.nextOrderNum === -1) {
            this.nextOrderNum = await this.initNextOrderNum();
        }
        const order = await Order.insert(new Order(this.nextOrderNum++, params.consumer, params.adress, JSON.parse(params.items)));
        await this.appendOrder(params.consumer, order);
        return order;
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

    private static async appendOrder(_consumer: any, _order: any) {
        const consumerPopulated = await User.getById(_consumer);
        consumerPopulated.orders.push(_order._id);
        await User.update(consumerPopulated);
    }
}

export {
    Order,
    OrderCreator
}