export class Point {
    X: number;
    Y: number;
    isDrag: boolean;
    color: string;
    hash: string;

    generateHash(X, Y, color, isDrag) {
//        return X +':'+ Y + ':' + isDrag + ':' + color;
        return X +':'+ Y + ':' + color;
    }

    constructor(X, Y, color, isDrag) {
        this.X = X;
        this.Y = Y;
        this.isDrag = isDrag;
        this.color = color;
        this.hash = this.generateHash(X, Y, color, isDrag);
    }
}
