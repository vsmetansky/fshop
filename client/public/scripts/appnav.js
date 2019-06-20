var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserState, UserStateType } from './util/userstate.js';
export default class AppNav {
    static render() {
        return __awaiter(this, void 0, void 0, function* () {
            if (AppNav.userState.prev !== AppNav.userState.cur) {
                const menu = document.getElementById('nav-main');
                if (menu !== null) {
                    const template = (yield axios.get('http://localhost:3000/templates/nav_main.mst')).data;
                    menu.innerHTML = Mustache.render(template, {
                        admin: AppNav.userState.cur === UserStateType.ADMIN ? true : false,
                        loggedIn: AppNav.userState.cur === UserStateType.GUEST ? false : true
                    });
                    AppNav.links = Array.prototype.slice.call(menu.childNodes);
                    AppNav.setLinkHandlers();
                }
            }
        });
    }
    static setLinkHandlers() {
        AppNav.links.forEach((link) => {
            link.addEventListener('click', (event) => {
                history.pushState({}, '', link.getAttribute("href"));
                window.dispatchEvent(new Event('popstate'));
                event.preventDefault();
            });
        });
    }
}
AppNav.userState = new UserState();
