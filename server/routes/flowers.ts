import * as express from 'express'
import multer from 'multer'

import { checkAdmin, checkAuth, checkCurrent } from './auth'
import Flower from '../models/flower'
import Error from '../error'
import CloudPhoto from './util/cloudphoto'
import Photo from '../models/util/photo';

const router = express.Router();
const upload = multer();

router.get('/', async (req, res) => {
	try {
		const flowers = await Flower.getAll();
		res.send(flowers);
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.get('/:id', checkAdmin, async (req, res) => {
	try {
		const flower = await Flower.getById(req.params.id);
		if (flower) return res.send(flower);
		res.send(new Error(404, 'bullshit'));
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const deleted = await Flower.delete(req.params.id);
		await CloudPhoto.rem(deleted.photo.cloudId);
		res.send(deleted);
	} catch (err) {
		res.send(new Error(500, err.message));
	}
});

router.post('/', upload.single('photo'), async (req, res) => {
	try {
		let data = req.body;
		const fileObject: any = req.file;
		const photo: any = await CloudPhoto.add(fileObject.buffer);
		const flower = await Flower.insert(new Flower(data.name, data.price, new Photo(photo.public_id, photo.secure_url)));
		res.send(flower);
	} catch(err) {
		console.log(err.message);
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

export { router as flowersRouter };