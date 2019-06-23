import * as express from 'express'
import { checkAdmin, checkAuth, checkCurrent } from './auth'
import { Order, OrderCreator } from '../models/order'
import Error from '../error'
import multer = require('multer');
import User from '../models/user';

const router = express.Router();
const upload = multer();

router.get('/', async (req, res) => {
	try {
		res.send(await Order.getAll())
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.get('/:id', async (req, res) => {
	try {
		const user = await Order.getById(req.params.id);
		if (user) return res.send(user);
		res.send(new Error(404, 'bullshit'));
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const deletedOrder = await Order.delete(req.params.id);
		const consumer = await User.getById(deletedOrder.consumer);
		consumer.orders = consumer.orders.filter((order: any) => order._id !== deletedOrder._id);
		await User.update(consumer);
		res.send(deletedOrder);
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.post('/', upload.single(), async (req, res) => {
	try {
		const data = req.body;
		const order = await OrderCreator.makeItem({ consumer: data.consumer, items: data.items, adress: data.adress });
		res.send(order);
	} catch (err) {
		console.log(err.message);
		res.send(new Error(500, err.message));
	}
});

router.put('/:id', async (req, res) => {
	try {
		//res.send(await User.update())
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

export { router as ordersRouter };