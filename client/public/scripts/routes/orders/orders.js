var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserState } from '../../util/userstate.js';
import { Route } from '../route.js';
export default class Orders extends Route {
    static renderTemplate(app, routeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = (yield axios.get('http://localhost:3000/templates/orders/orders.mst')).data;
            app.innerHTML = Mustache.render(template, {
                items: routeData
            });
        });
    }
    static getRouteData(data, routeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield axios.get('http://localhost:3000/orders')).data;
        });
    }
    static setLinks(app) {
        this.links = Array.from(app.querySelectorAll('.delete-btn'));
    }
    static setLinkHandlers(app, routeData) {
        this.links.forEach((link) => {
            link.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const orderId = event.target.getAttribute('data-id');
                yield axios.delete(`http://localhost:3000/orders/${orderId}`);
                const deletedOrderCard = document.getElementById(orderId);
                deletedOrderCard.parentNode.removeChild(deletedOrderCard);
            }));
        });
    }
}
Orders.adress = '/orders';
Orders.userState = new UserState();
