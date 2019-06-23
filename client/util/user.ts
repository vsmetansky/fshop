declare let axios: any;

export default class User {
    private constructor() { }
    static isLoggedIn(user: any) {
        if (user !== undefined)
            return user.email !== undefined;
        return false;
    }
    static isError(user: any) {
        if (user !== undefined)
            return user.code !== undefined;
        return false;
    }
    static async isAdmin(user: any) {
        if (User.isLoggedIn(user))
            return user.admin;
        return false;
    }
    static async getCurUser() {
        const user = (await axios.get('http://localhost:3000/users/me')).data;
        return user.email === undefined ? undefined : user;
    }
}