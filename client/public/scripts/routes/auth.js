var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserState } from '../util/userstate.js';
import User from '../util/user.js';
import { Route } from './route.js';
export default class Auth extends Route {
    static render(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = document.getElementById('app');
            if (app !== null) {
                const template = (yield axios.get('http://localhost:3000/templates/auth.mst')).data;
                app.innerHTML = Mustache.render(template, {});
                Auth.links = [document.getElementById('login-form'), document.getElementById('signup-form')];
                Auth.setLinks();
            }
        });
    }
    static setLinks() {
        Auth.links.forEach((link) => {
            link.addEventListener('submit', preventFormSubmittion);
            if (link.id === 'login-form') {
                link.addEventListener('submit', Auth.logIn);
            }
            else {
                link.addEventListener('submit', Auth.signUp);
            }
        });
        function preventFormSubmittion(event) {
            event.preventDefault();
        }
    }
    static logIn(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = Auth.links.find((l) => l.id === 'login-form');
            const email = form.querySelector('#email').value;
            const password = form.querySelector('#password').value;
            const userData = new FormData();
            userData.set('email', email);
            userData.set('password', password);
            const user = (yield axios.post('http://localhost:3000/auth/login', userData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })).data;
            if (User.isLoggedIn(user)) {
                history.pushState({}, '', '/profile');
                window.dispatchEvent(new Event('popstate'));
            }
        });
    }
    static signUp(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = Auth.links.find((l) => l.id === 'signup-form');
            const fullname = form.querySelector('#fullname').value;
            const email = form.querySelector('#email').value;
            const password = form.querySelector('#password').value;
            const userData = new FormData();
            userData.set('email', email);
            userData.set('password', password);
            userData.set('fullname', fullname);
            const user = (yield axios.post('http://localhost:3000/users/', userData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })).data;
            if (!User.isError(user)) {
                userData.delete('fullname');
                yield axios.post('http://localhost:3000/auth/login', userData);
                history.pushState({}, '', '/profile');
                window.dispatchEvent(new Event('popstate'));
            }
        });
    }
}
Auth.adress = '/auth';
Auth.userState = new UserState();
