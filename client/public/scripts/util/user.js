var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class User {
    constructor() { }
    static isLoggedIn(user) {
        if (user !== undefined)
            return user.email !== undefined;
        return false;
    }
    static isError(user) {
        if (user !== undefined)
            return user.code !== undefined;
        return false;
    }
    static isAdmin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (User.isLoggedIn(user))
                return user.admin;
            return false;
        });
    }
    static getCurUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield axios.get('http://localhost:3000/users/me')).data;
            return user.email === undefined ? undefined : user;
        });
    }
}
