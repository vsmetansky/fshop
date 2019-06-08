"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var storage_1 = __importDefault(require("./storage"));
var user_1 = __importDefault(require("./user"));
var flower_1 = __importDefault(require("./flower"));
var typegoose_1 = require("typegoose");
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order(_number, _consumer) {
        if (_number === void 0) { _number = 0; }
        if (_consumer === void 0) { _consumer = new user_1.default(); }
        var _this = _super.call(this) || this;
        _this.items = [];
        _this.number = _number;
        _this.consumer = _consumer;
        return _this;
    }
    Object.defineProperty(Order, "model", {
        get: function () {
            return OrderModel;
        },
        enumerable: true,
        configurable: true
    });
    Order.populator = function (items) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, items.populate('items').populate('adress').populate('consumer').sort('-date').exec()];
            });
        });
    };
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], Order.prototype, "number", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Object)
    ], Order.prototype, "consumer", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Object)
    ], Order.prototype, "adress", void 0);
    __decorate([
        typegoose_1.arrayProp({ itemsRef: flower_1.default }),
        __metadata("design:type", Array)
    ], Order.prototype, "items", void 0);
    return Order;
}(storage_1.default));
exports.Order = Order;
var OrderModel = new Order().getModelForClass(Order);
var OrderFactory = /** @class */ (function () {
    function OrderFactory() {
    }
    OrderFactory.makeNewOrder = function (_consumer) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.nextOrderNum === -1)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.initNextOrderNum()];
                    case 1:
                        _a.nextOrderNum = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, new Order(this.nextOrderNum++, _consumer)];
                }
            });
        });
    };
    OrderFactory.initNextOrderNum = function () {
        return __awaiter(this, void 0, void 0, function () {
            var orders, ordersLen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSortedOrders()];
                    case 1:
                        orders = _a.sent();
                        ordersLen = orders.length;
                        if (ordersLen > 0) {
                            return [2 /*return*/, orders[ordersLen - 1].number + 1];
                        }
                        return [2 /*return*/, 0];
                }
            });
        });
    };
    OrderFactory.getSortedOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order.getAll()];
                    case 1:
                        orders = _a.sent();
                        orders.sort(function (a, b) { return a.number - b.number; });
                        return [2 /*return*/, orders];
                }
            });
        });
    };
    OrderFactory.nextOrderNum = -1;
    return OrderFactory;
}());
exports.OrderFactory = OrderFactory;
