import { RouteMediator } from "../route";
import Flowers from "../flowers/flowers";
import Bag from "../orders/bag";
export default class FlowerBagMediator extends RouteMediator {
    static send() {
    }
}
FlowerBagMediator.RouteA = Flowers;
FlowerBagMediator.RouteB = Bag;
