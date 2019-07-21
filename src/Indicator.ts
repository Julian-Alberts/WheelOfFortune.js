abstract class Indicator {
    
    constructor(protected _color: string, protected _width: number, protected _height: number) {}

    public abstract render(ctx: CanvasRenderingContext2D);

}

class StaticIndicator extends Indicator{

    public render(ctx: CanvasRenderingContext2D) {
        const radius = (this._width > this._height? this._height : this._width) / 3;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, this._height - 5);
        ctx.lineTo(-radius, radius - 5);
        ctx.arcTo(radius, -radius - 5, radius, radius - 5, radius);
        ctx.closePath();
        ctx.fillStyle = this._color;
        ctx.fill();
        ctx.restore();
    }

}
