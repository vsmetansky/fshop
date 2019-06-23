import App from './app.js';
import AppNav from './appnav.js';
import User from './util/user.js';
import { UserStateType } from './util/userstate.js';

//subject
export default class Router {
    static routes: any = []; //observers
    private constructor() { }
    private static init(routes: any[]) {
        routes.forEach(r => Router.routes.push(r));
    }
    static listen(routes: any[]) {
        Router.init(routes);
        window.addEventListener('load', Router.updateRoute)
        window.addEventListener('popstate', Router.updateRoute);
    }
    //notify
    private static async updateRoute(event: any) {
        let curRoute: any = undefined;
        let curState = await Router.getCurUserState();
        Router.routes.forEach((r: any) => {
            if (curRoute === undefined) {
                curRoute = r.adress === window.location.pathname ? r : undefined;
            }
            r.userState.update(curState);
        });
        AppNav.userState.update(curState);
        await App.setCurrentRoute(curRoute, event.detail);
    }
    private static async getCurUserState() {
        const user = await User.getCurUser();
        if (User.isLoggedIn(user)) {
            return user.admin ? UserStateType.ADMIN : UserStateType.USER;
        }
        return UserStateType.GUEST;
    }
}