var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Route from './route.js';
import { UserState, UserStateType } from '../util/userstate.js';
export default class Flowers extends Route {
    static render() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = document.getElementById('app');
            if (app !== null) {
                const flowers = (yield axios.get('http://localhost:3000/flowers')).data;
                const template = (yield axios.get('http://localhost:3000/templates/flowers_grid.mst')).data;
                app.innerHTML = Mustache.render(template, {
                    items: flowers,
                    admin: Flowers.userState.cur === UserStateType.ADMIN ? true : false
                });
                Flowers.links.push(app.querySelector('#flowerForm'));
                Flowers.setLinks();
                //Flowers.links.push(app.querySelector('#flowers-adder'));
            }
        });
    }
    static setLinks() {
        Flowers.links.forEach((link) => {
            if (link.id === 'flowerForm') {
                link.addEventListener('submit', preventFormSubmittion);
                link.addEventListener('submit', Flowers.addFlower);
            }
        });
        function preventFormSubmittion(event) {
            event.preventDefault();
        }
    }
    static addFlower() {
        return __awaiter(this, void 0, void 0, function* () {
            const form = Flowers.links.find((l) => l.id === 'flowerForm');
            const name = form.querySelector('#name').value;
            const price = form.querySelector('#price').value;
            const photo = form.querySelector('#photo').value;
            const flowerData = new FormData();
            flowerData.set('name', name);
            flowerData.set('price', price);
            flowerData.set('photo', photo);
            const flower = (yield axios.post('http://localhost:3000/flowers', flowerData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })).data;
            history.pushState({}, '', '/flower');
            window.dispatchEvent(new CustomEvent('popstate', {
                detail: {
                    id: flower._id
                },
            }));
        });
    }
}
Flowers.adress = '/flowers';
Flowers.userState = new UserState();
