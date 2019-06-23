import { UserState, UserStateType } from '../../util/userstate.js';
import User from '../../util/user.js';
import { Route } from '../route.js';

declare let Mustache: any;
declare let axios: any;

export default class Orders extends Route {
    protected static adress = '/orders';
    protected static links: any[];
    static userState: any = new UserState();

    protected static async renderTemplate(app: Element, routeData: any) {
        const template = (await axios.get('http://localhost:3000/templates/orders/orders.mst')).data;
        app.innerHTML = Mustache.render(template, {
            items: routeData
        });
    }
    protected static async getRouteData(data: any, routeData: any) {
        return (await axios.get('http://localhost:3000/orders')).data;
    }
    protected static setLinks(app: Element) {
        this.links = Array.from(app.querySelectorAll('.delete-btn'));
    }
    protected static setLinkHandlers(app: Element, routeData: any) {
        this.links.forEach((link: any) => {
            link.addEventListener('click', async (event: any) => {
                const orderId = event.target.getAttribute('data-id');
                await axios.delete(`http://localhost:3000/orders/${orderId}`);
                const deletedOrderCard = document.getElementById(orderId);
                deletedOrderCard.parentNode.removeChild(deletedOrderCard);
            });
        });
    }
}