var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Router from './router.js';
import AppNav from './appnav.js';
//routes
import Main from './routes/main.js';
import Flower from './routes/flowers/flower.js';
import Flowers from './routes/flowers/flowers.js';
import Auth from './routes/auth.js';
import Profile from './routes/profile.js';
import Users from './routes/users.js';
import Orders from './routes/orders/orders.js';
import { BagBuffer } from './routes/orders/bagbuffer.js';
const ROUTES = [Main, Flowers, Flower, Auth, Profile, Users, Orders, BagBuffer];
//main app
export default class App {
    constructor() { }
    static setCurrentRoute(route, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (route !== undefined) {
                this._currentRoute = route;
                yield AppNav.render();
                yield this._currentRoute.render(data);
            }
        });
    }
}
//starting app
Router.listen(ROUTES);
BagBuffer.listen();
