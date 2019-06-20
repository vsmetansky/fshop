var UserStateType;
(function (UserStateType) {
    UserStateType[UserStateType["ADMIN"] = 0] = "ADMIN";
    UserStateType[UserStateType["USER"] = 1] = "USER";
    UserStateType[UserStateType["GUEST"] = 2] = "GUEST";
})(UserStateType || (UserStateType = {}));
class UserState {
    constructor() {
        this.prev = -1;
        this.cur = -1;
    }
    update(cur) {
        this.prev = this.cur;
        this.cur = cur;
    }
}
export { UserState, UserStateType };
