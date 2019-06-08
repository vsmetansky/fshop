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
                    isAdmin: Flowers.userState === UserStateType.ADMIN ? true : false
                });
            }
        });
    }
}
Flowers.adress = '/flowers';
Flowers.userState = new UserState(UserStateType.USER);
