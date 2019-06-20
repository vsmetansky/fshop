import { UserState, UserStateType } from '../../util/userstate.js';
import User from '../../util/user.js';
import { Route } from '../route.js';

declare let Mustache: any;
declare let axios: any;

export default class Orders extends Route {
    protected static adress = '/orders';
    protected static links: any[];
    static userState: any = new UserState();
    protected static async renderTemplate(app: Element) { 
        const template = (await axios.get('http://localhost:3000/templates/orders.mst')).data;
        app.innerHTML = Mustache.render(template, {});

    }
    protected static setLinks(app: Element) { 

    }
    protected static setLinkHandlers(app: Element) { 
        Orders.links.forEach((link: any) => {
            link.addEventListener('submit', preventFormSubmittion);
            if (link.id === 'login-form') {
                link.addEventListener('submit', Orders.logIn);
            } else {
                link.addEventListener('submit', Orders.signUp);
            }
        });
        function preventFormSubmittion(event: any) {
            event.preventDefault();
        }
    }
    private static async logIn(event: any) {
        const form = Orders.links.find((l: any) => l.id === 'login-form');
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
        const form = Orders.links.find((l: any) => l.id === 'signup-form');
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