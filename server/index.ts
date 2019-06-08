import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import Config from './config';

//routers' imports
import { authRouter } from './routes/auth';
import { usersRouter } from './routes/users';
import { ordersRouter } from './routes/orders';
import { flowersRouter } from './routes/flowers';
import { adressesRouter } from './routes/adresses';

//fckn requires, fckn nodejs
const busboyBodyParser = require('busboy-body-parser');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: Config.cloudinary.cloudName,
    api_key: Config.cloudinary.apiKey,
    api_secret: Config.cloudinary.apiSecret
});

//creating new server 
const server = express();

const connectOptions = {
    useNewUrlParser: true
};

server.use(cors());

// server.set('views', './views');
server.use(express.static(__dirname + '/../client/public'));

//parsers stuff
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(busboyBodyParser({
    limit: '30mb'
}));
server.use(bodyParser.json());
server.use(cookieParser()); 

//auth stuff
server.use(session({
    secret: "c$xznlij+%nreov_nr9848j93jp8$2r7rgh9p$9hpd310--0=1d03=13'mpwx`9821rf$7290,.2;>k3eijp6e",
    resave: false,
    saveUninitialized: true
}));
server.use(passport.initialize());
server.use(passport.session());

//routers stuff
server.use('/auth', authRouter);
server.use('/adresses', adressesRouter);
server.use('/orders', ordersRouter);
server.use('/users', usersRouter);
server.use('/flowers', flowersRouter);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.get('/', (req, res) => {
    res.render('index');
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

startServer();

async function startServer() {
    try {
        await startDatabase();
        server.listen(Config.serverPort, () => console.log(`Server started: ${Config.serverPort}`));
    } catch (err) {
        console.log(`Server failed to start: ${err.message}`);
    }
}

async function startDatabase() {
    try {
        await mongoose.connect(Config.databaseUrl, connectOptions);
        console.log(`Database connected: ${Config.databaseUrl}`);
    } catch (err) {
        console.log(`Database is not connected: ${err.message}`);
    }
}