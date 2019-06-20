import Bag from './bag.js';
import { RouteProxy } from '../route.js';

const BagBufferEvent: string = 'bag-add-item';
const BagCheckoutEvent: string = 'bag-checkout';

class BagBuffer extends RouteProxy {
    static items: any[] = [];
    static route: any = Bag;
    protected static adress = '/bag';
    static userState: any = BagBuffer.route.userState;    
    static listen() {
        window.addEventListener(BagBufferEvent, (event: any) => {
            this.items.push(event.detail.item);
        });
        window.addEventListener(BagCheckoutEvent, (event: any) => {
            this.items.length = 0;
        });
    }
    static async render(data: any, routeData: any = undefined) {
        await this.route.render(data, this.items);
    }
}

export {
    BagBuffer,
    BagBufferEvent,
    BagCheckoutEvent
}