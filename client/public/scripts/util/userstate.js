var UserStateType;
(function (UserStateType) {
    UserStateType[UserStateType["ADMIN"] = 0] = "ADMIN";
    UserStateType[UserStateType["USER"] = 1] = "USER";
})(UserStateType || (UserStateType = {}));
class UserState {
    constructor(cur) {
        this.prev = -1;
        this.cur = cur;
    }
    update(cur) {
        this.prev = this.cur;
        this.cur = cur;
    }
}
export { UserState, UserStateType };
