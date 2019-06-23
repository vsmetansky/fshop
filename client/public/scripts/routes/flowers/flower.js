var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Route } from '../route.js';
import { UserState, UserStateType } from '../../util/userstate.js';
import { BagBufferEvent } from '../orders/bagbuffer.js';
export default class Flower extends Route {
    static renderTemplate(app, routeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = (yield axios.get('http://localhost:3000/templates/flowers/flower.mst')).data;
            app.innerHTML = Mustache.render(template, {
                item: routeData,
                isAdmin: this.userState.cur === UserStateType.ADMIN ? true : false
            });
        });
    }
    static getRouteData(data, routeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield axios.get(`http://localhost:3000/flowers/${data.id}`)).data;
        });
    }
    static setLinks(app) {
        this.links = [app.querySelector('#delete-btn'), app.querySelector('#buy-btn')];
    }
    static setLinkHandlers(app, routeData) {
        this.links.forEach((link) => {
            this.addBuyHandler(link, routeData);
            this.addDeleteHandler(link);
        });
    }
    static addDeleteHandler(link) {
        if (link !== null && link.id === 'delete-btn') {
            link.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const flowerId = event.target.getAttribute('data-id');
                yield axios.delete(`http://localhost:3000/flowers/${flowerId}`);
                history.pushState({}, '', '/flowers');
                window.dispatchEvent(new CustomEvent('popstate'));
            }));
        }
    }
    static addBuyHandler(link, routeData) {
        if (link !== null && link.id === 'buy-btn') {
            link.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const flowerId = event.target.getAttribute('data-id');
                window.dispatchEvent(new CustomEvent(BagBufferEvent, {
                    detail: {
                        item: routeData
                    }
                }));
            }));
        }
    }
}
Flower.adress = '/flower';
Flower.userState = new UserState();
