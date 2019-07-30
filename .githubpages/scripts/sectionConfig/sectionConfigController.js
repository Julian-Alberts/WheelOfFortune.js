var SectionCofingController = /** @class */ (function () {
    function SectionCofingController(root, position) {
        var _this = this;
        this.position = position;
        this._sectionConfigModel = new SectionConfigModel();
        this._sectionConfigView = new SectionConfigView();
        this._sectionConfigView.onChange = function (id, text, textColor, backgroundColor) {
            _this._sectionConfigModel.id = id;
            _this._sectionConfigModel.text = text;
            _this._sectionConfigModel.textColor = textColor;
            _this._sectionConfigModel.backgroundColor = backgroundColor;
            _this.onChange(_this.position, _this._sectionConfigModel);
        };
        this._sectionConfigView.onChangePosition = function (dir) { return _this.onSwitchPosition(_this.position, dir); };
        this._sectionConfigView.onRemove = function () { return _this.onRemove(_this.position); };
        root.appendChild(this._sectionConfigView.rootElement);
    }
    SectionCofingController.prototype.getSectionConfig = function () {
        return this._sectionConfigModel;
    };
    return SectionCofingController;
}());
//# sourceMappingURL=sectionConfigController.js.map