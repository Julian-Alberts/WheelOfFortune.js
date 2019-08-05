declare abstract class Indicator {
    protected _color: string;
    protected _width: number;
    protected _height: number;
    constructor(_color: string, _width: number, _height: number);
    abstract render(ctx: CanvasRenderingContext2D): any;
}
declare class StaticIndicator extends Indicator {
    render(ctx: CanvasRenderingContext2D): void;
}
