import { UserState, UserStateType } from '../../util/userstate.js';
import { Route } from '../route.js';
import User from '../../util/user.js';

declare let Mustache: any;
declare let axios: any;

export default class Bag extends Route {
    protected static adress = '/bag';
    protected static links: any[];
    static userState: any = new UserState();

    protected static async renderTemplate(app: Element, routeData: any) {
        const template = (await axios.get('http://localhost:3000/templates/orders/bag.mst')).data;
        app.innerHTML = Mustache.render(template, {
            items: routeData
        });
    }
    protected static async getRouteData(data: any, routeData: any) {
        return routeData;
    }
    protected static setLinkHandlers(app: Element, routeData: any) {
        this.links.forEach((link: any) => {
            this.setSubmitHandlers(link, routeData);
            this.setFlowerHandlers(link);
        });
    }
    protected static setLinks(app: Element) {
        this.links = Array.from(app.querySelectorAll('.router-link'));
        this.links.push(app.querySelector('#submit-btn'));
    }
    private static setSubmitHandlers(link: any, routeData: any) {
        if (link.id === 'submit-btn') {
            link.addEventListener('click', (event: any) => {
                this.renderAdresses(event, routeData);
            });
        }
    }
    private static setFlowerHandlers(link: any) {
        if (link.className === 'router-link') {
            link.addEventListener('click', this.goToFlower);
        }
    }
    private static goToFlower(event: any) {
        const flowerId = event.target.getAttribute('data-id');
        history.pushState({}, '', '/flower');
        window.dispatchEvent(new CustomEvent('popstate', {
            detail: {
                id: flowerId
            },
        }));
        event.preventDefault();
    }
    private static async renderAdresses(event: any, routeData: any) {
        const template = (await axios.get('http://localhost:3000/templates/orders/adresses.mst')).data;
        const user = await User.getCurUser();
        Mustache.render(template, {
            items: user ? user.adresses : [],
            isUser: this.userState.cur === UserStateType.USER ? true : false
        });
    }
    private static async checkout() {

    }
    // private static async logOut() {
    //     await axios.get('http://localhost:3000/auth/logout');
    //     history.pushState({}, '', '/');
    //     window.dispatchEvent(new Event('popstate'));
    // }
}
