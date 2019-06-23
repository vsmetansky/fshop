import * as express from 'express'
import { checkAdmin, checkAuth, checkCurrent } from './auth'
import { Adress, AdressCreator } from '../models/adress'
import Error from '../error'
import multer from 'multer'
import User from '../models/user';

const router = express.Router();
const upload = multer();

router.get('/', checkAdmin, async (req, res) => {
	try {
		res.send(await Adress.getAll())
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.get('/:id', checkAdmin, async (req, res) => {
	try {
		const user = await Adress.getById(req.params.id);
		if (user) return res.send(user);
		res.send(new Error(404, 'bullshit'));
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.delete('/:id', checkAdmin, async (req, res) => {
	try {
		res.send(await Adress.delete(req.params.id));
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.post('/', upload.none(), async (req, res) => {
	try {
		const data = req.body;
		const adress = await AdressCreator.makeItem({ consumer: data.consumer, office: data.office, city: data.city });
		res.send(adress);
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.put('/:id', checkAdmin, async (req, res) => {
	try {
		//res.send(await User.update())
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

export { router as adressesRouter };