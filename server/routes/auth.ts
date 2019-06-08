import * as express from 'express'
import * as bcrypt from 'bcrypt'
import passport from 'passport'

import User from '../models/user'
import Config from '../config'

const router = express.Router();

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(strategy));

passport.serializeUser((user: any, done: Function) => {
	done(null, user._id);
});

passport.deserializeUser(async (id: string, done: Function) => {
	try {
		const user = await User.getById(id);
		done(null, user);
	} catch (err) {
		done(err, null)
	}
});

router.post('/login',
	passport.authenticate('local'),
	(req, res) => {
		res.send(req.user);
	});

router.post('/logout', (req, res) => {	
	req.logout();
	res.redirect(Config.websiteUrl);
});

function checkAuth(
	req: express.Request,
	res: express.Response,
	next: Function) {
	if (!req.user) res.send({});
	else next();
}

async function checkAdmin(
	req: express.Request,
	res: express.Response,
	next: Function) {
	if (req.user && req.user.admin) next();
	res.redirect(Config.websiteUrl);
}

async function checkCurrent(
	req: express.Request,
	res: express.Response,
	next: Function) {
	if (req.user) {
		const sessionId = req.user._id.toString();
		if (sessionId === req.params.id) next();
	}
	res.redirect(Config.websiteUrl);
}

async function strategy(email: string, password: string, done: Function) {
	try {
		const users = await User.getAll();
		const user = users.find((u: User) => {
			return u.email === email;
		});
		if (user !== undefined) {
			const match = await bcrypt.compare(user.password, password);
			if (match) done(null, user);
		}
		done(null, undefined);
	} catch (err) {
		done(err, null);
	}
}

export {
	router as authRouter,
	checkAuth,
	checkAdmin,
	checkCurrent
};