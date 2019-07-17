/// <reference path="sectionData.d.ts" />
/// <reference path="WheelOfFortuneConfig.d.ts" />


class WheelOfFortune {

    private _canvas: HTMLCanvasElement;
    private _rotationsPerSecond: number;
    private _lastFrame: number;
    private _currentRotation: number = 0;
    private _wheelImg: HTMLImageElement;

    constructor(rootElement: HTMLElement, private _sectionData: SectionData[], private _winCallback: (id: number) => void, private _config: WheelOfFortuneConfig = {}) {

        if (rootElement.tagName === 'CANVAS') {
            this._canvas = <HTMLCanvasElement>rootElement;
        } else {
            this._canvas = document.createElement('canvas');
        }
        const radius = (this._canvas.width > this._canvas.height ? this._canvas.height: this._canvas.width) / 2;
        this._wheelImg = this._preRenderWheelToImg(this._sectionData, radius);
        window.requestAnimationFrame(() => this._render());
    }

    private _preRenderWheelToImg(sectionData: SectionData[], radius: number): HTMLImageElement {
        radius -= 10;
        const img = new Image(radius * 2, radius * 2);
        const canvas = document.createElement('canvas');
        canvas.height = canvas.width = radius * 2;
        const ctx = canvas.getContext('2d');
        const fullCircle = 360 * Math.PI/180;
        const sectionAngle = fullCircle / sectionData.length;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-(90 * Math.PI / 180 + sectionAngle / 2));
        sectionData.forEach((element, index) => {
            ctx.save();
            ctx.beginPath();
            ctx.rotate(sectionAngle * index);
            ctx.moveTo(0,0);
            ctx.arc(0, 0 , radius, 0, sectionAngle);
            ctx.fillStyle = element.backgroundColor;
            ctx.closePath();
            ctx.fill();
            ctx.rotate(sectionAngle / 2)
            ctx.textAlign = 'center';
            ctx.font = this._config.text ? this._config.text.font : '15px Arial';
            ctx.fillStyle = element.textColor || (this._config.text?this._config.text.font:'black');
            ctx.fillText(element.text, radius / 2, this._config.text?this._config.text.size/2:7.5, radius - 40);
            if (this._config.strokColor) {
                ctx.strokeStyle = this._config.strokColor;
                ctx.stroke();
            }
            ctx.restore();    
        });
        ctx.restore();
        if (this._config.pins && this._config.pins.color && this._config.pins.size > 0) {
            this._drawPins(sectionData, radius);
        }
        img.src = canvas.toDataURL('');
        return img;
    }

    private _drawPins(sectionData: SectionData[], radius: number) {
        const ctx = this._canvas.getContext('2d');
        const fullCircle = 360 * Math.PI/180;
        const sectionAngle = fullCircle / sectionData.length;
        ctx.save();
        ctx.translate(this._canvas.width / 2, this._canvas.height / 2);
        ctx.rotate(-(90 * Math.PI / 180 + sectionAngle / 2));
        this._sectionData.forEach((_, index) => {
            const angle = sectionAngle * index; 
        });
        ctx.restore();
    }

    private _render() {
        const ctx = this._canvas.getContext('2d');
        const radius = this._wheelImg.width / 2;
        const cWidth = this._canvas.width;
        const cHeight = this._canvas.height;
        ctx.clearRect(0,0,cWidth,cHeight);
        ctx.save();
        ctx.translate(cWidth / 2, cHeight / 2);
        ctx.rotate(this._currentRotation);
        ctx.drawImage(this._wheelImg, -radius, -radius);
        ctx.restore();

    }

    private _animateSpin(timeSinceLastFrame: number) {
        const fullCircle = 360 * Math.PI/180;
        this._rotationsPerSecond -= .5 / 1000 * timeSinceLastFrame;
        if (this._rotationsPerSecond > 0) {
            this._currentRotation += fullCircle * this._rotationsPerSecond / 1000 * timeSinceLastFrame;
        }
        this._render();
        if (this._rotationsPerSecond > 0) {
            window.requestAnimationFrame(timestamp => {
                const timeSinceLastFrame = timestamp - this._lastFrame;
                this._lastFrame = timestamp;
                this._animateSpin(timeSinceLastFrame);
            });
        } else {
            this._winCallback(this.getCurrentTopSection());
        }
    }

    private getCurrentTopSection(): number {
        const fullCircle = 360 * Math.PI/180;
        const sectionAngle = fullCircle / this._sectionData.length;
        const actualRotation = this._currentRotation % fullCircle;
        const id = ~~(actualRotation / sectionAngle + .5);
        return id;
    }

    public spin(minSpeed = 2, maxSpeed = 5) {
        if (this._rotationsPerSecond != 0) {
            this._rotationsPerSecond = Math.random() * (maxSpeed - minSpeed) + minSpeed;
            this._lastFrame = performance.now();
            window.requestAnimationFrame(timestamp => {
                const timeSinceLastFrame = timestamp - this._lastFrame;
                this._lastFrame = timestamp;
                this._animateSpin(timeSinceLastFrame);
            });
        }
    }

}