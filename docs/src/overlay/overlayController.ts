class OverlayController {

    private _overlayView: OverlayView;

    constructor(sections: SectionData[], config: WheelOfFortuneConfig) {
        this._overlayView = new OverlayView(sections, config);
    }
    
}
