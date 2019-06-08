export default class Photo {
    cloudId: string;
    path: string;
    constructor(_cloudId: string, _path: string) {
        this.cloudId = _cloudId;
        this.path = _path;
    }
}