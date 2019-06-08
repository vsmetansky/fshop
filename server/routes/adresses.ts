import * as express from 'express'
import { checkAdmin, checkAuth, checkCurrent } from './auth'
import Adress from '../models/adress'
import Error from '../error'

const router = express.Router();

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

router.post('/:id', async (req, res) => {
	try {
		//res.send(await User.insert(new User()))
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