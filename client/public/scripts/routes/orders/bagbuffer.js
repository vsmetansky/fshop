var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Bag from './bag.js';
import { RouteProxy } from '../route.js';
const BagBufferEvent = 'bag-add-item';
const BagCheckoutEvent = 'bag-checkout';
class BagBuffer extends RouteProxy {
    static listen() {
        window.addEventListener(BagBufferEvent, (event) => {
            this.items.push(event.detail.item);
        });
        window.addEventListener(BagCheckoutEvent, (event) => {
            this.items.length = 0;
            history.pushState({}, '', '/flowers');
            window.dispatchEvent(new Event('popstate'));
        });
    }
    static render(data, routeData = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.route.render(data, this.items);
        });
    }
}
BagBuffer.items = [];
BagBuffer.route = Bag;
BagBuffer.adress = '/bag';
BagBuffer.userState = BagBuffer.route.userState;
export { BagBuffer, BagBufferEvent, BagCheckoutEvent };
