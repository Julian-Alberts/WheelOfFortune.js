var WofConfigController = /** @class */ (function () {
    function WofConfigController(root) {
        var _this = this;
        this._wofConfig = {};
        this._wofConfigView = new WofConfigView(root);
        this._wofConfigView.onChange = function (conf, val) { return _this.onChange(conf, val); };
    }
    return WofConfigController;
}());
//# sourceMappingURL=wofConfigController.js.map