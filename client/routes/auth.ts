import { UserState, UserStateType } from '../util/userstate.js';
import User from '../util/user.js';
import { Route } from './route.js';

declare let Mustache: any;
declare let axios: any;

export default class Auth extends Route {
    protected static adress = '/auth';
    protected static links: any[];
    static userState: any = new UserState();
    static async render(data: any) {
        const app = document.getElementById('app');
        if (app !== null) {
            const template = (await axios.get('http://localhost:3000/templates/auth.mst')).data;
            app.innerHTML = Mustache.render(template, {});
            Auth.links = [document.getElementById('login-form'), document.getElementById('signup-form')]
            Auth.setLinks();
        }
    }
    protected static setLinks() {
        Auth.links.forEach((link: any) => {
            link.addEventListener('submit', preventFormSubmittion);
            if (link.id === 'login-form') {
                link.addEventListener('submit', Auth.logIn);
            } else {
                link.addEventListener('submit', Auth.signUp);
            }
        });
        function preventFormSubmittion(event: any) {
            event.preventDefault();
        }
    }
    private static async logIn(event: any) {
        const form = Auth.links.find((l: any) => l.id === 'login-form');
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        const userData = new FormData();
        userData.set('email', email);
        userData.set('password', password);
        
        const user = (await axios.post('http://localhost:3000/auth/login', userData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;

        if (User.isLoggedIn(user)) {
            history.pushState({}, '', '/profile');
            window.dispatchEvent(new Event('popstate'));
        }
    }
    private static async signUp(event: any) {
        const form = Auth.links.find((l: any) => l.id === 'signup-form');
        const fullname = form.querySelector('#fullname').value;
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        const userData = new FormData();
        userData.set('email', email);
        userData.set('password', password);
        userData.set('fullname', fullname);

        const user = (await axios.post('http://localhost:3000/users/', userData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;

        if (!User.isError(user)) {
            userData.delete('fullname');
            await axios.post('http://localhost:3000/auth/login', userData);
            history.pushState({}, '', '/profile');
            window.dispatchEvent(new Event('popstate'));
        }
    }
}