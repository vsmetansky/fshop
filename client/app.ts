import Router from './router.js'
import AppNav from './appnav.js'

declare let Mustache: any;
declare let axios: any;

//routes
import Main from './routes/main.js'
import Flowers from './routes/flowers.js'

const ROUTES: any[] = [Main, Flowers];

//main app
export default class App {
    private static _currentRoute: any;
    private constructor() { }
    static async start() {
        await App.setCurrentRoute(Main);
    }
    static async setCurrentRoute(route: any) {
        if (route !== undefined) {
            this._currentRoute = route;
            await AppNav.render();
            await this._currentRoute.render();
        }
    }
}

//starting app
App.start();
Router.listen(ROUTES);