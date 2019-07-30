class WofConfigController {

    private _wofConfigView: WofConfigView;
    private _wofConfig: WheelOfFortuneConfig;
    public onChange: (config: string[], value: string | number) => void;

    constructor(root: HTMLElement) {
        this._wofConfig = {}
        this._wofConfigView = new WofConfigView(root);
        this._wofConfigView.onChange = (conf, val) => this.onChange(conf, val);
    }

}
