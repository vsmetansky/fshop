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
import { BagCheckoutEvent } from './bagbuffer.js';
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
            const comp = Mustache.render(template, {
                items: user !== undefined ? user.adresses : [],
                isUser: this.userState.cur === UserStateType.USER ? true : false
            });
            const compContainer = document.getElementById('order-container-items');
            this.replaceChildren(compContainer, comp);
            yield this.setAdressHandlers(compContainer, user, routeData);
        });
    }
    static replaceChildren(parent, newChild) {
        parent.innerHTML = newChild;
    }
    static setAdressHandlers(parent, user, routeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const submitButton = parent.querySelector('#submit-btn');
            submitButton.addEventListener('click', (event) => event.preventDefault());
            if (user !== undefined) {
                submitButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    const adresses = Array.from(parent.querySelectorAll('.custom-control-input'));
                    let curAdress = adresses.find((a) => a.checked);
                    if (curAdress === undefined) {
                        const city = parent.querySelector('#city').value;
                        const number = parent.querySelector('#office').value;
                        const adressData = new FormData();
                        adressData.set('city', city);
                        adressData.set('office', number);
                        adressData.set('consumer', user._id);
                        const adress = (yield axios.post('http://localhost:3000/adresses', adressData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })).data;
                        curAdress = adress._id;
                    }
                    else {
                        curAdress = curAdress.value;
                    }
                    const orderData = new FormData();
                    orderData.set('adress', curAdress);
                    orderData.set('consumer', user._id);
                    orderData.set('items', JSON.stringify(routeData));
                    const order = (yield axios.post('http://localhost:3000/orders', orderData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })).data;
                    window.dispatchEvent(new CustomEvent(BagCheckoutEvent));
                }));
            }
            else {
                submitButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    const fullname = parent.querySelector('#fullname').value;
                    const email = parent.querySelector('#email').value;
                    const password = parent.querySelector('#password').value;
                    const userData = new FormData();
                    userData.set('email', email);
                    userData.set('password', password);
                    userData.set('fullname', fullname);
                    const user = (yield axios.post('http://localhost:3000/users', userData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })).data;
                    const city = parent.querySelector('#city').value;
                    const number = parent.querySelector('#office').value;
                    const adressData = new FormData();
                    adressData.set('city', city);
                    adressData.set('office', number);
                    adressData.set('consumer', user._id);
                    const adress = (yield axios.post('http://localhost:3000/adresses', adressData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })).data;
                    const orderData = new FormData();
                    orderData.set('adress', adress._id);
                    orderData.set('consumer', user._id);
                    orderData.set('items', JSON.stringify(routeData));
                    yield axios.post('http://localhost:3000/orders', orderData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    window.dispatchEvent(new CustomEvent(BagCheckoutEvent));
                }));
            }
        });
    }
}
Bag.adress = '/bag';
Bag.userState = new UserState();
