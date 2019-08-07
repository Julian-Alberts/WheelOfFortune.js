class ConfigController {

    private _sectionsController: SectionCofingController[] = [];
    private _wofConfigController: WofConfigController;
    private _sections: SectionData[];
    private _canvas: HTMLCanvasElement;
    private _sectionsContainer: HTMLElement;
    private _wheelOfFortune: WheelOfFortune;
    private _config: WheelOfFortuneConfig = {};


    constructor() {
        this._sections = [];
        this._canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this._sectionsContainer = document.querySelector('.section-config');
        document.querySelector('[name="create-new--section"]').addEventListener('click', () => {
            this.createNewSectionConfig();
        });
        document.getElementById('export-config').addEventListener('click', (e) => {
            this.exportConfig();
        });
        document.getElementById('spin').addEventListener('click', () => {
            this._wheelOfFortune.spin();
        });
        this.createNewSectionConfig();
        this._wofConfigController = new WofConfigController(document.querySelector('.wof-config'));
        this._wofConfigController.onChange = (conf, val) => this.configChange(conf, val);
    }

    public createNewSectionConfig() {
        const controller = new SectionCofingController(this._sectionsContainer, this._sectionsController.length);
        controller.onChange = (pos, conf) => this._sectionChange(pos, conf);
        controller.onSwitchPosition = (pos, dir) => this._switchSectionPosition(pos, dir);
        controller.onRemove = (pos) => this.deleteSection(pos);
        this._sectionsController.push(controller);
        this._sections.push(controller.getSectionConfig());
        this._updateWof();
    }

    public _sectionChange(pos: number, conf: SectionData) {
        this._sections[pos] = conf;
        this._updateWof();
    }

    public configChange(configKey: string[], value: string | number) {
        console.log(configKey, value);
        let currentValue = this._config;
        configKey.forEach((key, index) => {
            if (key in currentValue){
                if (index === configKey.length - 1) {
                    currentValue[key] = value;
                } else {
                    currentValue = currentValue[key];
                }
            } else {
                if (index === configKey.length - 1) {
                    currentValue[key] = value;
                } else {
                    currentValue[key] = {};
                    currentValue = currentValue[key];
                }
            }
        });
        this._updateWof();
    }

    public deleteSection(position: number) {
        this._sections = this._sections.filter((_, key) => {
            return key !== position;
        });

        this._sectionsController  = this._sectionsController.filter((_, key) => {
            return key !== position;
        });
        this._sectionsContainer.removeChild(this._sectionsContainer.children[position]);

        for(let i = position; i < this._sectionsController.length; i++) {
            this._sectionsController[i].position = i;
        }

        this._updateWof();
    }

    private _switchSectionPosition(position: number, dir: -1 | 1) {

        if (position + dir >= this._sections.length || position + dir < 0) {
            return;
        }

        const srcSection = this._sections[position];
        const srcController = this._sectionsController[position];
        this._sections[position] = this._sections[position + dir];
        this._sectionsController[position] = this._sectionsController[position + dir];
        this._sections[position + dir] = srcSection;
        this._sectionsController[position + dir] = srcController;

        this._sectionsController[position + dir].position = position + dir;
        this._sectionsController[position].position = position;

        if (dir === 1) {
            this._sectionsContainer.insertBefore(this._sectionsContainer.children[position + 1], this._sectionsContainer.children[position]);
        } else {
            this._sectionsContainer.insertBefore(this._sectionsContainer.children[position], this._sectionsContainer.children[position - 1]);
        }

        this._updateWof();
    }

    private _updateWof() {
        this._wheelOfFortune = new WheelOfFortune(this._canvas, this._sections, this._config);
    }

    public exportConfig () {
        const overlayController = new OverlayController(this._sections, this._config);
    }
}

new ConfigController();
