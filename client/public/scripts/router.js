var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import App from './app.js';
import AppNav from './appnav.js';
import Auth from './util/auth.js';
import { UserStateType } from './util/userstate.js';
export default class Router {
    constructor() { }
    static init(routes) {
        routes.forEach(r => Router.routes.push(r));
    }
    static listen(routes) {
        Router.init(routes);
        window.addEventListener('popstate', () => __awaiter(this, void 0, void 0, function* () {
            let curRoute = undefined;
            let curState = Router.getCurUserState();
            Router.routes.forEach((r) => {
                if (curRoute === undefined) {
                    curRoute = r.adress === window.location.pathname ? r : undefined;
                }
                r.userState.update(curState);
            });
            AppNav.userState.update(curState);
            yield App.setCurrentRoute(curRoute);
        }));
    }
    static getCurUserState() {
        return __awaiter(this, void 0, void 0, function* () {
            return Auth.isAdmin(yield Auth.getCurUser()) ? UserStateType.ADMIN : UserStateType.USER;
        });
    }
}
Router.routes = [];
