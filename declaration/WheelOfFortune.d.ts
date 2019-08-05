declare class WheelOfFortune {
    private _sectionData;
    private _winCallback;
    private _canvas;
    private _rotationsPerSecond;
    private _lastFrame;
    private _currentRotation;
    private _wheelImg;
    private _indicator;
    private _config;
    constructor(rootElement: HTMLElement, _sectionData: SectionData[], _winCallback: (section: SectionData) => void, config?: WheelOfFortuneConfig);
    private _preRenderWheelToImg;
    private _drawPins;
    private _render;
    private _animateSpin;
    private _getCurrentTopSection;
    spin(minSpeed?: number, maxSpeed?: number): void;
    private _fillConfig;
}
