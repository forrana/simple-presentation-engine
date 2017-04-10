import { Point } from './point';

export class Points {
    field: any = new Map();
    created: Date;

    constructor() {
        this.created = new Date();
    }

    addClick(X, Y, isDrag, color) {
        let point = new Point(X, Y, color, isDrag);

        this.addPoint(point);
    }

    eraseClick(X, Y, isDrag, color) {
        let point = new Point(X, Y, color, isDrag);

        if(this.field.has(point.hash)) {
            this.field.delete(point.hash);
        }
    }

    addPoint(point) {
        if(!this.field.has(point.hash)) {
            this.field.set(point.hash, point);
        }
    }

    getPoints():any {
        return this.field.values();
    }

    clearField() {
        this.field = new Map();
    }
}
