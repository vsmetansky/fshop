var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Auth {
    constructor() { }
    static isLoggedIn(user) {
        return user.toString() !== {}.toString();
    }
    static isAdmin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Auth.isLoggedIn(user))
                return user.admin;
            return false;
        });
    }
    static getCurUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield axios.get('http://localhost:3000/users/me')).data;
        });
    }
}
