import { Route } from '../route.js'
import User from '../../util/user.js'
import { UserState, UserStateType } from '../../util/userstate.js';
import { BagBufferEvent } from '../orders/bagbuffer.js';

declare let axios: any;
declare let Mustache: any;

export default class Flower extends Route {
    protected static adress = '/flower';
    protected static links: any[];
    static userState: any = new UserState();

    protected static async renderTemplate(app: Element, routeData: any) {
        const template = (await axios.get('http://localhost:3000/templates/flowers/flower.mst')).data;
        app.innerHTML = Mustache.render(template, {
            item: routeData,
            isAdmin: this.userState.cur === UserStateType.ADMIN ? true : false
        });
    }
    protected static async getRouteData(data: any, routeData: any) {
        return (await axios.get(`http://localhost:3000/flowers/${data.id}`)).data;
    }
    protected static setLinks(app: Element) {
        this.links = [app.querySelector('#delete-btn'), app.querySelector('#buy-btn')];
    }
    protected static setLinkHandlers(app: Element, routeData: any) {
        this.links.forEach((link: any) => {
            this.addBuyHandler(link, routeData);
            this.addDeleteHandler(link);
        });
    }
    private static addDeleteHandler(link: any) {
        if (link !== null && link.id === 'delete-btn') {
            link.addEventListener('click', async (event: any) => {
                const flowerId = event.target.getAttribute('data-id');
                await axios.delete(`http://localhost:3000/flowers/${flowerId}`);
                history.pushState({}, '', '/flowers');
                window.dispatchEvent(new CustomEvent('popstate'));
            });
        }
    }
    private static addBuyHandler(link: any, routeData: any) {
        if (link !== null && link.id === 'buy-btn') {
            link.addEventListener('click', async (event: any) => {
                const flowerId = event.target.getAttribute('data-id');
                window.dispatchEvent(new CustomEvent(BagBufferEvent, {
                    detail: {
                        item: routeData
                    }
                }));
            });
        }
    }
}   