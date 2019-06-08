enum UserStateType {
    ADMIN,
    USER
}

class UserState {
    prev: UserStateType = -1;
    cur: UserStateType;
    constructor(cur: UserStateType) {
        this.cur = cur;
    }
    update(cur: UserStateType) {
        this.prev = this.cur;
        this.cur = cur;
    }
}

export {
    UserState,
    UserStateType
}