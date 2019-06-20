var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserState, UserStateType } from '../../util/userstate.js';
import { Route } from '../route.js';
import User from '../../util/user.js';
export default class Bag extends Route {
    static renderTemplate(app, routeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = (yield axios.get('http://localhost:3000/templates/orders/bag.mst')).data;
            app.innerHTML = Mustache.render(template, {
                items: routeData
            });
        });
    }
    static getRouteData(data, routeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return routeData;
        });
    }
    static setLinkHandlers(app, routeData) {
        this.links.forEach((link) => {
            this.setSubmitHandlers(link, routeData);
            this.setFlowerHandlers(link);
        });
    }
    static setLinks(app) {
        this.links = Array.from(app.querySelectorAll('.router-link'));
        this.links.push(app.querySelector('#submit-btn'));
    }
    static setSubmitHandlers(link, routeData) {
        if (link.id === 'submit-btn') {
            link.addEventListener('click', (event) => {
                this.renderAdresses(event, routeData);
            });
        }
    }
    static setFlowerHandlers(link) {
        if (link.className === 'router-link') {
            link.addEventListener('click', this.goToFlower);
        }
    }
    static goToFlower(event) {
        const flowerId = event.target.getAttribute('data-id');
        history.pushState({}, '', '/flower');
        window.dispatchEvent(new CustomEvent('popstate', {
            detail: {
                id: flowerId
            },
        }));
        event.preventDefault();
    }
    static renderAdresses(event, routeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = (yield axios.get('http://localhost:3000/templates/orders/adresses.mst')).data;
            const user = yield User.getCurUser();
            Mustache.render(template, {
                items: user ? user.adresses : [],
                isUser: this.userState.cur === UserStateType.USER ? true : false
            });
        });
    }
    static checkout() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
Bag.adress = '/bag';
Bag.userState = new UserState();
