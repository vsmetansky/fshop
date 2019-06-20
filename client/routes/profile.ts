import { UserState, UserStateType } from '../util/userstate.js';
import User from '../util/user.js';
import { Route } from './route.js';

declare let Mustache: any;
declare let axios: any;

export default class Profile extends Route {
    protected static adress = '/profile';
    protected static links: any[];
    static userState: any = new UserState();
    protected static async renderTemplate(app: Element) {
        const user = (await axios.get('http://localhost:3000/users/me')).data;
        const template = (await axios.get('http://localhost:3000/templates/profile.mst')).data;
        app.innerHTML = Mustache.render(template, {
            item: user,
            isAdmin: this.userState.cur === UserStateType.ADMIN ? true : false,
            isUser: true
        });
    }
    protected static setLinkHandlers(app: Element) {
        this.links.forEach((l: any) => {
            l.addEventListener('submit', preventDefault);
            if (l.id === 'logout-form') {
                l.addEventListener('submit', this.logOut);
            }
        });
        function preventDefault(event: any) {
            event.preventDefault();
        }
    }
    protected static setLinks(app: Element) {
        this.links = [app.querySelector('#logout-form')];
    }
    private static async logOut() {
        await axios.get('http://localhost:3000/auth/logout');
        history.pushState({}, '', '/');
        window.dispatchEvent(new Event('popstate'));
    }
}