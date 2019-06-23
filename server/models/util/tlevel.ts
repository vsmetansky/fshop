export default class TLevel {
    min: number;
    max: number;
    constructor(_min: number, _max: number) {
        if (_min > _max) [_min, _max] = [_max, _min]
        this.min = _min;
        this.max = _max;
    }

}