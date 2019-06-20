import Router from './router.js'
import AppNav from './appnav.js'

declare let Mustache: any;
declare let axios: any;

//routes
import Main from './routes/main.js'
import Flower from './routes/flowers/flower.js'
import Flowers from './routes/flowers/flowers.js'
import Auth from './routes/auth.js'
import Profile from './routes/profile.js'
import Users from './routes/users.js'
import Orders from './routes/orders/orders.js'
import { BagBuffer } from './routes/orders/bagbuffer.js'

const ROUTES: any[] = [Main, Flowers, Flower, Auth, Profile, Users, Orders, BagBuffer];

//main app
export default class App {
    private static _currentRoute: any;
    private constructor() { }
    static async setCurrentRoute(route: any, data: any) {
        if (route !== undefined) {
            this._currentRoute = route;
            await AppNav.render();
            await this._currentRoute.render(data);
        }
    }
}

//starting app
Router.listen(ROUTES);
BagBuffer.listen();