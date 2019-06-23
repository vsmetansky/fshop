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
import User from './util/user.js';
import { UserStateType } from './util/userstate.js';
//subject
export default class Router {
    constructor() { }
    static init(routes) {
        routes.forEach(r => Router.routes.push(r));
    }
    static listen(routes) {
        Router.init(routes);
        window.addEventListener('load', Router.updateRoute);
        window.addEventListener('popstate', Router.updateRoute);
    }
    //notify
    static updateRoute(event) {
        return __awaiter(this, void 0, void 0, function* () {
            let curRoute = undefined;
            let curState = yield Router.getCurUserState();
            Router.routes.forEach((r) => {
                if (curRoute === undefined) {
                    curRoute = r.adress === window.location.pathname ? r : undefined;
                }
                r.userState.update(curState);
            });
            AppNav.userState.update(curState);
            yield App.setCurrentRoute(curRoute, event.detail);
        });
    }
    static getCurUserState() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.getCurUser();
            if (User.isLoggedIn(user)) {
                return user.admin ? UserStateType.ADMIN : UserStateType.USER;
            }
            return UserStateType.GUEST;
        });
    }
}
Router.routes = []; //observers
