import * as express from 'express'
import multer from 'multer'

import { checkAdmin, checkAuth, checkCurrent } from './auth'
import { Flower, FlowerBuilder, FlowerBuilderDirector } from '../models/flower'
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

router.get('/:id', async (req, res) => {
	try {
		res.send(await Flower.getById(req.params.id));
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

		const flowerMaker = new FlowerBuilderDirector(new FlowerBuilder()
			.buildName(data.name)
			.buildPrice(data.price)
			.buildPhoto(new Photo(photo.public_id, photo.secure_url)));

		const flower = await Flower.insert(flowerMaker.makeFlower());
		res.send(flower);
	} catch (err) {
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