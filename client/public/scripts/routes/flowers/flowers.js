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
export default class Flowers extends Route {
    static renderTemplate(app, routeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = (yield axios.get('http://localhost:3000/templates/flowers/flowers.mst')).data;
            app.innerHTML = Mustache.render(template, {
                items: routeData,
                isAdmin: this.userState.cur === UserStateType.ADMIN ? true : false
            });
        });
    }
    static getRouteData(data, routeData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (routeData === undefined) {
                return (yield axios.get('http://localhost:3000/flowers')).data;
            }
            return routeData;
        });
    }
    static setLinks(app) {
        this.links = [app.querySelector('#flowerForm')]
            .concat(Array.from(app.querySelectorAll('.router-link')))
            .concat(Array.from(app.querySelectorAll('#delete-btn')))
            .concat(Array.from(app.querySelectorAll('#buy-btn')));
    }
    static setLinkHandlers(app, routeData) {
        this.links.forEach((link) => {
            if (link !== null) {
                if (link.id === 'flowerForm') {
                    link.addEventListener('submit', preventDefaultEvent);
                    link.addEventListener('submit', Flowers.addFlower);
                }
                else if (link.id === 'delete-btn') {
                    link.addEventListener('click', Flowers.deleteFlower);
                }
                else if (link.id === 'buy-btn') {
                    link.addEventListener('click', (event) => {
                        const flowerId = event.target.getAttribute('data-id');
                        window.dispatchEvent(new CustomEvent(BagBufferEvent, {
                            detail: {
                                item: routeData.find((i) => i._id === flowerId)
                            }
                        }));
                        preventDefaultEvent(event);
                    });
                }
                else {
                    link.addEventListener('click', Flowers.goToFlower);
                }
            }
        });
        function preventDefaultEvent(event) {
            event.preventDefault();
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
    static deleteFlower(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const flowerId = event.target.getAttribute('data-id');
            const deleted = (yield axios.delete(`http://localhost:3000/flowers/${flowerId}`)).data;
            if (deleted !== undefined) {
                const deletedFlowerCard = document.getElementById(flowerId);
                if (deletedFlowerCard !== null) {
                    deletedFlowerCard.parentNode.removeChild(deletedFlowerCard);
                }
            }
            event.preventDefault();
        });
    }
    static addFlower(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = Flowers.links.find((l) => l.id === 'flowerForm');
            const name = form.querySelector('#name').value;
            const price = form.querySelector('#price').value;
            const photo = form.querySelector('#photo').files[0];
            const flowerData = new FormData();
            flowerData.set('name', name);
            flowerData.set('price', price);
            flowerData.set('photo', photo);
            const flower = (yield axios.post('http://localhost:3000/flowers/', flowerData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })).data;
            Flowers.closeModal();
            const template = (yield axios.get('http://localhost:3000/templates/flowers/flower.mst')).data;
            const cards = document.querySelector('#card-set');
            const card = Mustache.render(template, {
                item: flower
            });
            cards.appendChild(card);
        });
    }
    static closeModal() {
        const modal = document.querySelector('.modal');
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('style', 'display: none');
    }
}
Flowers.adress = '/flowers';
Flowers.userState = new UserState();
