import Route from './route.js'
import Auth from '../util/auth.js'
import { UserState, UserStateType } from '../util/userstate.js';

declare let axios: any;
declare let Mustache: any;

export default class Flowers extends Route {
    protected static adress = '/flowers';
    static userState: any = new UserState(UserStateType.USER);
    static async render() {
        const app = document.getElementById('app');
        if (app !== null) {
            const flowers = (await axios.get('http://localhost:3000/flowers')).data;
            const template = (await axios.get('http://localhost:3000/templates/flowers_grid.mst')).data;
            app.innerHTML = Mustache.render(template, {
                items: flowers,
                isAdmin: Flowers.userState === UserStateType.ADMIN ? true : false
            });
        }
    }
}