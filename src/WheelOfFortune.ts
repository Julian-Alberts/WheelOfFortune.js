class WheelOfFortune {

    private _canvas: HTMLCanvasElement;
    private _rotationsPerSecond: number;
    private _lastFrame: number;
    private _currentRotation: number = 0;
    private _wheelImg: HTMLImageElement;
    private _indicator: Indicator;
    private _config: WheelOfFortuneConfig;
    private _winCallback: (section: SectionData) => void = () => {};
    private _onUpdate: (section: SectionData) => void;

    constructor(rootElement: HTMLElement, private _sectionData: SectionData[], config: WheelOfFortuneConfig = {}) {
        this._config = config = this._fillConfig(config);
        if (rootElement.tagName === 'CANVAS') {
            this._canvas = <HTMLCanvasElement>rootElement;
        } else {
            this._canvas = document.createElement('canvas');
        }
        this._config.indicator = config.indicator;
        if (config.indicator) {
            switch(config.indicator.style) {
                case 'static': 
                    this._indicator = new StaticIndicator(config.indicator.color, config.indicator.width, config.indicator.height);
                    break;
            }
        }

        const radius = ((this._canvas.width > this._canvas.height ? this._canvas.height: this._canvas.width) / 2);
        this._wheelImg = this._preRenderWheelToImg(this._sectionData, radius);
        window.requestAnimationFrame(() => this._render());
    }

    private _preRenderWheelToImg(sectionData: SectionData[], radius: number): HTMLImageElement {
        radius -= 10;
        const img = new Image(radius * 2, radius * 2);
        const canvas = document.createElement('canvas');
        canvas.height = canvas.width = radius * 2;
        const ctx = canvas.getContext('2d');
        const fullCircle = Math.PI * 2;
        const sectionAngle = fullCircle / sectionData.length;
        if (this._config.stroke) {
            radius -= this._config.stroke.width;
        }
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((Math.PI + sectionAngle) / -2);
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
            ctx.font = this._config.text.size + 'px ' + this._config.text.font;
            ctx.fillStyle = element.textColor || this._config.text.color;
            ctx.fillText(element.text, radius / 2, this._config.text.size/2, radius - 40);
            if (this._config.stroke) {
                ctx.strokeStyle = this._config.stroke.color;
                ctx.lineWidth = this._config.stroke.width;
                ctx.stroke();
            }
            ctx.restore();    
        });
        ctx.restore();
        if (this._config.pins && this._config.pins.color && this._config.pins.size > 0) {
            this._drawPins(ctx, sectionData, radius);
        }
        img.src = canvas.toDataURL('');
        return img;
    }

    private _drawPins(ctx: CanvasRenderingContext2D, sectionData: SectionData[], radius: number) {
        const fullCircle = Math.PI * 2;
        const sectionAngle = fullCircle / sectionData.length;
        const pins = this._config.pins;
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.rotate((Math.PI + sectionAngle) / 2);
        this._sectionData.forEach((_, index) => {
            ctx.save();
            ctx.beginPath();
            const angle = sectionAngle * index;
            ctx.rotate(angle);
            ctx.arc(-(radius - pins.size / 2 - pins.margin), 0, pins.size, 0, fullCircle);
            ctx.fillStyle = pins.color;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        });
        ctx.restore();
    }

    private _render() {
        const ctx = this._canvas.getContext('2d');
        const imgSize = this._canvas.width > this._canvas.height ? this._canvas.height : this._canvas.width;
        const cWidth = this._canvas.width;
        const cHeight = this._canvas.height;
        ctx.clearRect(0,0,cWidth,cHeight);
        ctx.save();
        if (this._indicator) {
            ctx.translate(cWidth / 2, cHeight / 2 + this._config.indicator.height);
        } else {
            ctx.translate(cWidth / 2, cHeight / 2);
        }
        ctx.rotate(this._currentRotation);
        ctx.drawImage(this._wheelImg, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
        ctx.restore();
        if (this._indicator) {
            ctx.save();
            ctx.translate(cWidth / 2, (cHeight - imgSize) / 2);
            this._indicator.render(ctx);
            ctx.restore();
        }

    }

    private _animateSpin(timeSinceLastFrame: number) {
        const fullCircle = Math.PI * 2;
        this._rotationsPerSecond -= .5 / 1000 * timeSinceLastFrame;
        if (this._rotationsPerSecond > 0) {
            this._currentRotation += fullCircle * this._rotationsPerSecond / 1000 * timeSinceLastFrame;
        }
        this._render();

        if (this._onUpdate) {
            this._onUpdate(this._getCurrentTopSection());
        }
        
        if (this._rotationsPerSecond > 0) {
            window.requestAnimationFrame(timestamp => {
                const timeSinceLastFrame = timestamp - this._lastFrame;
                this._lastFrame = timestamp;
                this._animateSpin(timeSinceLastFrame);
            });
        } else {
            this._winCallback(this._getCurrentTopSection());
        }
    }

    private _getCurrentTopSection(): SectionData {
        const fullCircle = Math.PI * 2;
        const sectionAngle = fullCircle / this._sectionData.length;
        const actualRotation = fullCircle - this._currentRotation % fullCircle;
        let index = ~~(actualRotation / sectionAngle + .5);
        index = index === this._sectionData.length ? 0 : index;
        return this._sectionData[index];
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

    public setWinCallback(callback: (section: SectionData) => void) {
        this._winCallback = callback;
    }

    public setOnUpdate(callback: (section: SectionData) => void) {
        this._onUpdate = callback;
    }

    private _fillConfig(config: WheelOfFortuneConfig): WheelOfFortuneConfig {
        if (config.indicator) {
            config.indicator.color = config.indicator.color || 'black';
            config.indicator.height = config.indicator.height || 30;
            config.indicator.width = config.indicator.width || 20;
            config.indicator.style = config.indicator.style || 'none';
        } else {
            config.indicator = {
                style: 'none',
                color: 'balck',
                height: 30,
                width: 20
            };
        }
        if (config.pins) {
            config.pins.color = config.pins.color || 'black';
            config.pins.margin = config.pins.margin || 10;
            config.pins.size = config.pins.size || 10;
        }
        if (config.stroke) {
            config.stroke.color = config.stroke.color || 'black';
            config.stroke.width = config.stroke.width || 1;
        }
        if (!config.text) {
            config.text = {
                color: 'black',
                font: 'Arial',
                size: 15,
            };
        }
        config.text.color = config.text.color || 'black';
        config.text.font = config.text.font || 'Arial';
        config.text.size = config.text.size || 15;
        
        return config;
    }

}
