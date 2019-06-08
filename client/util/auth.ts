declare let axios: any;

export default class Auth {
    private constructor() {}
    static async isLoggedIn(user: any) {
        if (user !== {}) return true;
        return false;
    }
    static async isAdmin(user: any) {
        if (user !== {}) return user.admin;
        return false;
    }
    static async getCurUser() {
        return (await axios.get('http://localhost:3000/users/me')).data;
    }
}