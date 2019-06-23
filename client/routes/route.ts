abstract class Route {
    protected static adress: string;
    protected static links: any[];
    static userState: any;
    //template method
    static async render(data: any, routeData: any = undefined) {
        const app = document.getElementById('app');
        if (app !== null) {
            routeData = await this.getRouteData(data, routeData);
            await this.renderTemplate(app, routeData);
            this.setLinks(app);
            this.setLinkHandlers(app, routeData);
        }
    }
    //primitive method
    protected static async getRouteData(data: any, routeData: any) { }
    //primitive method
    protected static async renderTemplate(app: Element, routeData: any) { }
    //primitive method
    protected static setLinks(app: Element) { }
    //primitive method
    protected static setLinkHandlers(app: Element, routeData: any) { }
}

abstract class RouteProxy extends Route {
    static route: any;
    static async render(data: any, routeData: any = undefined) {
        await this.route.render(data, routeData);
    }
}

export {
    Route,
    RouteProxy
}
