var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Route {
    //abstract method
    static render(data, routeData = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = document.getElementById('app');
            if (app !== null) {
                routeData = yield this.getRouteData(data, routeData);
                yield this.renderTemplate(app, routeData);
                this.setLinks(app);
                this.setLinkHandlers(app, routeData);
            }
        });
    }
    //primitive method
    static getRouteData(data, routeData) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    //primitive method
    static renderTemplate(app, routeData) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    //primitive method
    static setLinks(app) { }
    //primitive method
    static setLinkHandlers(app, routeData) { }
}
class RouteProxy extends Route {
    static render(data, routeData = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.route.render(data, routeData);
        });
    }
}
export { Route, RouteProxy };
