export default class Config {
    static cloudinary = {
        cloudName: process.env['CLOUD_NAME'] || 'dkb38i8lq',
        apiKey: process.env['API_KEY'] || '625666272294383',
        apiSecret: process.env['API_SECRET'] || 'HLFUMTVkxQAbKzG267fPT6kCb2Q'
    }
    static serverPort = process.env['PORT'] || 3000;
    static databaseUrl = process.env['DATABASE_URL'] || 'mongodb://localhost:27017/fshopdb';
    static websiteUrl = process.env['WEBSITE_URL'] || `localhost:${Config.serverPort}`;
    private constructor() { }
}
