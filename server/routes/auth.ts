import express from 'express'
import * as bcrypt from 'bcrypt'
import passport from 'passport'
import multer from 'multer'

import User from '../models/user'
import Config from '../config'

const router = express.Router();
const upload = multer();

const LocalStrategy = require('passport-local').Strategy;

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

passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, strategy));

router.post('/login', upload.none(), passport.authenticate('local'),
	(req, res) => {
		res.send(req.user);
	});

router.get('/logout', upload.none(), (req, res) => {
	req.logout();
	res.end();
});

function checkAuth(
	req: any,
	res: any,
	next: any) {
	if (!req.user) res.send({});
	else next();
}

function checkAdmin(
	req: any,
	res: any,
	next: any) {
	if (req.user && req.user.admin) next();
	res.redirect(Config.websiteUrl);
}

function checkCurrent(
	req: any,
	res: any,
	next: any) {
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
			const match = await bcrypt.compare(password, user.password);
			if (match) return done(null, user);
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