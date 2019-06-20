import * as express from 'express'
import { checkAdmin, checkAuth, checkCurrent } from './auth'
import * as bcrypt from 'bcrypt'
import multer from 'multer'

import User from '../models/user'
import Error from '../error'

const router = express.Router();
const upload = multer();

router.get('/me', checkAuth, async (req, res) => {
	try {
		res.send(await User.getById(req.user));
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.delete('/me', checkAuth, async (req, res) => {
	try {
		res.send(await User.delete(req.user));
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.put('/me', checkAuth, async (req, res) => {
	try {
		//res.send(await User.update())
	} catch (err) {
		res.send(new Error(500, err.message));
	}
})

router.get('/', async (req, res) => {
	try {
		res.send(await User.getAll());
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.get('/:id', checkAdmin, async (req, res) => {
	try {
		const user = await User.getById(req.params.id);
		if (user) return res.send(user);
		res.send(new Error(404, 'bullshit'));
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.delete('/:id', checkAdmin, async (req, res) => {
	try {
		res.send(await User.delete(req.params.id));
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.post('/', upload.none(), async (req, res) => {
	try {
		let data = req.body;
		const saltRounds = 1;
		data.password = await bcrypt.hash(data.password, saltRounds);
		const user = new User(data.email, data.password, data.fullname);
		res.send(await User.insert(user))
	} catch (err) {
		console.log(err.message);
		res.send(new Error(500, err.message));
	}
});

router.put('/:id', checkAdmin, async (req, res) => {
	try {
		// res.send(await User.update(req.params.id))
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

export { router as usersRouter };