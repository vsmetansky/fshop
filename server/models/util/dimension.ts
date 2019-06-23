export default class Dimension {
    width: number = 0;
    height: number = 0;
    constructor(_width: number, _height: number) {
        if (_width > 0 && _height > 0) {
            this.width = _width;
            this.height = _height;
        }
    }
}