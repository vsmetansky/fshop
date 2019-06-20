var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserState, UserStateType } from '../util/userstate.js';
import { Route } from './route.js';
export default class Users extends Route {
    static renderTemplate(app) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = (yield axios.get('http://localhost:3000/users')).data;
            const template = (yield axios.get('http://localhost:3000/templates/users.mst')).data;
            app.innerHTML = Mustache.render(template, {
                items: users,
                isAdmin: this.userState.cur === UserStateType.ADMIN ? true : false,
                isUser: true
            });
        });
    }
    static setLinkHandlers(app) {
        // this.links.forEach((l: any) => {
        //     l.addEventListener('submit', preventDefault);
        //     if (l.id === 'logout-form') {
        //         l.addEventListener('submit', this.logOut);
        //     }
        // });
        // function preventDefault(event: any) {
        //     event.preventDefault();
        // }
    }
    static setLinks(app) {
        //this.links = [app.querySelector('#logout-form')];
    }
    static logOut() {
        return __awaiter(this, void 0, void 0, function* () {
            // await axios.get('http://localhost:3000/auth/logout');
            // history.pushState({}, '', '/');
            // window.dispatchEvent(new Event('popstate'));
        });
    }
}
Users.adress = '/profile';
Users.userState = new UserState();
