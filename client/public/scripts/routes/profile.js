var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserState, UserStateType } from '../util/userstate.js';
import Auth from '../util/auth.js';
export default class Profile {
    static render() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = document.getElementById('app');
            if (app !== null) {
                let user = Auth.getCurUser();
                // const template = (await axios.get('http://localhost:3000/templates/landing.mst')).data;
                // app.innerHTML = Mustache.render(template, {});
            }
        });
    }
}
Profile.adress = '/profile';
Profile.userState = new UserState(UserStateType.USER);
