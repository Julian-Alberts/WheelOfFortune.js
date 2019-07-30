var SectionConfigView = /** @class */ (function () {
    function SectionConfigView() {
        var _this = this;
        this.rootElement = document.createElement('div');
        this._idElement = this._createNewConfigElement('number', 'id', 'ID: ');
        this._textElement = this._createNewConfigElement('text', 'text', 'Text: ');
        this._textColorElement = this._createNewConfigElement('color', 'text-color', 'Text Color: ');
        this._backgroundColorElement = this._createNewConfigElement('color', 'background-color', 'Background Color: ');
        var upButton = document.createElement('button');
        upButton.innerText = 'Up';
        upButton.addEventListener('click', function () {
            _this.onChangePosition(-1);
        });
        var rmButton = document.createElement('button');
        rmButton.innerText = 'Remove';
        rmButton.addEventListener('click', function () {
            _this.onRemove();
        });
        var downButton = document.createElement('button');
        downButton.innerText = 'Down';
        downButton.addEventListener('click', function () {
            _this.onChangePosition(1);
        });
        this.rootElement.classList.add('border', 'p-2', 'mb-2');
        upButton.classList.add('form-control', 'btn', 'btn-outline-dark', 'mt-2');
        rmButton.classList.add('form-control', 'btn', 'btn-danger', 'mt-2');
        downButton.classList.add('form-control', 'btn', 'btn-outline-dark', 'mt-2');
        this.rootElement.appendChild(upButton);
        this.rootElement.appendChild(rmButton);
        this.rootElement.appendChild(downButton);
    }
    SectionConfigView.prototype._createNewConfigElement = function (type, name, label) {
        var _this = this;
        var wrapper = document.createElement('div');
        var labelElem = document.createElement('div');
        labelElem.innerText = label;
        wrapper.appendChild(labelElem);
        this.rootElement.appendChild(wrapper);
        if (type === 'color') {
            var color_1 = document.createElement('input');
            wrapper.appendChild(color_1);
            wrapper.classList.add('color-input');
            color_1.type = 'color';
            color_1.style.display = 'none';
            var text_1 = document.createElement('input');
            wrapper.appendChild(text_1);
            text_1.name = name;
            text_1.classList.add('form-control');
            var button_1 = document.createElement('button');
            button_1.classList.add('color-button', 'form-control');
            wrapper.appendChild(button_1);
            button_1.addEventListener('click', function () {
                color_1.click();
            });
            color_1.addEventListener('change', function () {
                text_1.value = color_1.value;
                button_1.style.backgroundColor = text_1.value;
                _this._onChange();
            });
            text_1.addEventListener('change', function () {
                button_1.style.backgroundColor = text_1.value;
                _this._onChange();
            });
            return text_1;
        }
        var elem = document.createElement('input');
        elem.classList.add('form-control');
        elem.type = type;
        elem.name = name;
        elem.addEventListener('change', function () { return _this._onChange(); });
        wrapper.appendChild(elem);
        return elem;
    };
    SectionConfigView.prototype._onChange = function () {
        this.onChange(Number(this._idElement.value), this._textElement.value, this._textColorElement.value, this._backgroundColorElement.value);
    };
    return SectionConfigView;
}());
//# sourceMappingURL=sectionConfigView.js.map