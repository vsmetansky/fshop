declare let axios: any;

export default class User {
    private constructor() { }
    static isLoggedIn(user: any) {
        return user.email !== undefined;
    }
    static isError(user: any) {
        return user.code !== undefined;
    }
    static async isAdmin(user: any) {
        if (User.isLoggedIn(user)) 
            return user.admin;
        return false;
    }
    static async getCurUser() {
        return (await axios.get('http://localhost:3000/users/me')).data;
    }
}