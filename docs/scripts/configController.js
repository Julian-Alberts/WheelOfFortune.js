var ConfigController = /** @class */ (function () {
    function ConfigController() {
        var _this = this;
        this._sectionsController = [];
        this._config = {};
        this._sections = [];
        this._canvas = document.getElementById('canvas');
        this._wheelOfFortune = new WheelOfFortune(this._canvas, this._sections, this._config);
        this._sectionsContainer = document.querySelector('.section-config');
        document.querySelector('[name="create-new--section"]').addEventListener('click', function () {
            _this.createNewSectionConfig();
        });
        document.getElementById('export-config').addEventListener('click', function (e) {
            _this.exportConfig();
        });
        document.getElementById('spin').addEventListener('click', function () {
            _this._wheelOfFortune.spin();
        });
        this.createNewSectionConfig();
        this._wofConfigController = new WofConfigController(document.querySelector('.wof-config'));
        this._wofConfigController.onChange = function (conf, val) { return _this.configChange(conf, val); };
    }
    ConfigController.prototype.createNewSectionConfig = function () {
        var _this = this;
        var controller = new SectionCofingController(this._sectionsContainer, this._sectionsController.length);
        controller.onChange = function (pos, conf) { return _this._sectionChange(pos, conf); };
        controller.onSwitchPosition = function (pos, dir) { return _this._switchSectionPosition(pos, dir); };
        controller.onRemove = function (pos) { return _this.deleteSection(pos); };
        this._sectionsController.push(controller);
        this._sections.push(controller.getSectionConfig());
        this._updateWof();
    };
    ConfigController.prototype._sectionChange = function (pos, conf) {
        this._sections[pos] = conf;
        this._updateWof();
    };
    ConfigController.prototype.configChange = function (configKey, value) {
        console.log(configKey, value);
        var currentValue = this._config;
        configKey.forEach(function (key, index) {
            if (key in currentValue) {
                if (index === configKey.length - 1) {
                    currentValue[key] = value;
                }
                else {
                    currentValue = currentValue[key];
                }
            }
            else {
                if (index === configKey.length - 1) {
                    currentValue[key] = value;
                }
                else {
                    currentValue[key] = {};
                    currentValue = currentValue[key];
                }
            }
        });
        this._updateWof();
    };
    ConfigController.prototype.deleteSection = function (position) {
        this._sections = this._sections.filter(function (_, key) {
            return key !== position;
        });
        this._sectionsController = this._sectionsController.filter(function (_, key) {
            return key !== position;
        });
        this._sectionsContainer.removeChild(this._sectionsContainer.children[position]);
        for (var i = position; i < this._sectionsController.length; i++) {
            this._sectionsController[i].setPosition(i);
        }
        this._updateWof();
    };
    ConfigController.prototype._switchSectionPosition = function (position, dir) {
        if (position + dir >= this._sections.length || position + dir < 0) {
            return;
        }
        var srcSection = this._sections[position];
        var srcController = this._sectionsController[position];
        this._sections[position] = this._sections[position + dir];
        this._sectionsController[position] = this._sectionsController[position + dir];
        this._sections[position + dir] = srcSection;
        this._sectionsController[position + dir] = srcController;
        this._sectionsController[position + dir].setPosition(position + dir);
        this._sectionsController[position].setPosition(position);
        if (dir === 1) {
            this._sectionsContainer.insertBefore(this._sectionsContainer.children[position + 1], this._sectionsContainer.children[position]);
        }
        else {
            this._sectionsContainer.insertBefore(this._sectionsContainer.children[position], this._sectionsContainer.children[position - 1]);
        }
        this._updateWof();
    };
    ConfigController.prototype._updateWof = function () {
        this._wheelOfFortune.setConfige(this._config);
        this._wheelOfFortune.setSectionData(this._sections);
    };
    ConfigController.prototype.exportConfig = function () {
        var overlayController = new OverlayController(this._sections, this._config);
    };
    return ConfigController;
}());
new ConfigController();
//# sourceMappingURL=configController.js.map