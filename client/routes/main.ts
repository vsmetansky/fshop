import Route from './route.js'
import { UserState, UserStateType } from '../util/userstate.js';

declare let Mustache: any;
declare let axios: any;

export default class Main extends Route {
    protected static adress = '/';
    static userState: any = new UserState(UserStateType.USER);
    static async render() {
        const app = document.getElementById('app');
        if (app !== null) {
            const template = (await axios.get('http://localhost:3000/templates/landing.mst')).data;
            app.innerHTML = Mustache.render(template, {});
        }
    }
}