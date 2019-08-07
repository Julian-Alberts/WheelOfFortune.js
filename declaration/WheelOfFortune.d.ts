declare class WheelOfFortune {
    private _sectionData;
    private _canvas;
    private _rotationsPerSecond;
    private _lastFrame;
    private _currentRotation;
    private _wheelImg;
    private _indicator;
    private _config;
    private _winCallback;
    private _onUpdate;
    constructor(rootElement: HTMLElement, _sectionData: SectionData[], config?: WheelOfFortuneConfig);
    private _preRenderWheelToImg;
    private _drawPins;
    private _render;
    private _animateSpin;
    private _getCurrentTopSection;
    spin(minSpeed?: number, maxSpeed?: number): void;
    setWinCallback(callback: (section: SectionData) => void): void;
    setOnUpdate(callback: (section: SectionData) => void): void;
    private _fillConfig;
}
