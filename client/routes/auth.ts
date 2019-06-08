import { UserState, UserStateType } from '../util/userstate.js';
import Auth from '../util/auth.js';

declare let Mustache: any;
declare let axios: any;

export default class Profile {
    protected static adress = '/profile';
    static userState: any = new UserState(UserStateType.USER);
    static async render() {
        const app = document.getElementById('app');
        if (app !== null) {
            let user = Auth.getCurUser()
            const template = (await axios.get('http://localhost:3000/templates/landing.mst')).data;
            app.innerHTML = Mustache.render(template, {});
        }
    }
}