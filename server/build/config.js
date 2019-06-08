"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.cloudinary = {
        cloudName: process.env['CLOUD_NAME'] || 'dkb38i8lq',
        apiKey: process.env['API_KEY'] || '625666272294383',
        apiSecret: process.env['API_SECRET'] || 'HLFUMTVkxQAbKzG267fPT6kCb2Q'
    };
    Config.serverPort = process.env['PORT'] || 3000;
    Config.databaseUrl = process.env['DATABASE_URL'] || 'mongodb://localhost:27017/fshopdb';
    Config.websiteUrl = process.env['WEBSITE_URL'] || "localhost:" + Config.serverPort;
    return Config;
}());
exports.default = Config;
