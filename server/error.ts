export default class Error {
    code: number;
    message: string;
    constructor(_code: number, _message: string) {
        this.code = _code;
        this.message = _message;
    }
}   