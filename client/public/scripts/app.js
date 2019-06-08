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
import Flowers from './routes/flowers.js';
const ROUTES = [Main, Flowers];
//main app
export default class App {
    constructor() { }
    static start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield App.setCurrentRoute(Main);
        });
    }
    static setCurrentRoute(route) {
        return __awaiter(this, void 0, void 0, function* () {
            if (route !== undefined) {
                this._currentRoute = route;
                yield AppNav.render();
                yield this._currentRoute.render();
            }
        });
    }
}
//starting app
App.start();
Router.listen(ROUTES);
