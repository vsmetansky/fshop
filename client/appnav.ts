import { UserState, UserStateType } from './util/userstate.js'

declare let axios: any;
declare let Mustache: any;

export default class AppNav {
    static userState: any = new UserState();
    protected static links: any[];
    static async render() {
        if (AppNav.userState.prev !== AppNav.userState.cur) {
            const menu = document.getElementById('nav-main');
            if (menu !== null) {
                const template = (await axios.get('http://localhost:3000/templates/nav_main.mst')).data;
                menu.innerHTML = Mustache.render(template, {
                    admin: AppNav.userState.cur === UserStateType.ADMIN ? true : false,
                    loggedIn: AppNav.userState.cur === UserStateType.GUEST ? false : true
                });
                AppNav.links = Array.prototype.slice.call(menu.childNodes);
                AppNav.setLinkHandlers();
            }
        }
    }
    private static setLinkHandlers() {
        AppNav.links.forEach((link: any) => {
            link.addEventListener('click', (event: any) => {
                history.pushState({}, '', link.getAttribute("href"));
                window.dispatchEvent(new Event('popstate'));
                event.preventDefault();
            });
        });
    }
}