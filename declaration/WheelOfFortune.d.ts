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
    setConfige(config: WheelOfFortuneConfig): void;
    setSectionData(sectionData: SectionData[]): void;
    private _update;
    setWinCallback(callback: (section: SectionData) => void): void;
    setOnUpdate(callback: (section: SectionData) => void): void;
    getIndicator(indicator: {
        color?: string;
        style: 'none' | 'static';
        width?: number;
        height?: number;
    }): Indicator;
    private _fillConfig;
}
