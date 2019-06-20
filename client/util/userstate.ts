enum UserStateType {
    ADMIN,
    USER,
    GUEST
}

class UserState {
    prev: UserStateType = -1;
    cur: UserStateType = -1;
    update(cur: UserStateType) {
        this.prev = this.cur;
        this.cur = cur;
    }
}

export {
    UserState,
    UserStateType
}