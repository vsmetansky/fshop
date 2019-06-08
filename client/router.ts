import App from './app.js';
import AppNav from './appnav.js';
import Auth from './util/auth.js';
import { UserStateType } from './util/userstate.js';

declare let axios: any;

export default class Router {
    static routes: any = [];
    private constructor() { }
    private static init(routes: any[]) {
        routes.forEach(r => Router.routes.push(r));
    }
    static listen(routes: any[]) {
        Router.init(routes);
        window.addEventListener('popstate', async () => {
            let curRoute: any = undefined;
            let curState = Router.getCurUserState();
            Router.routes.forEach((r: any) => {
                if (curRoute === undefined) {
                    curRoute = r.adress === window.location.pathname ? r : undefined;
                }
                r.userState.update(curState);
            });
            AppNav.userState.update(curState);
            await App.setCurrentRoute(curRoute);
        });
    }
    private static async getCurUserState() {
        return Auth.isAdmin(await Auth.getCurUser()) ? UserStateType.ADMIN : UserStateType.USER;
    }
}