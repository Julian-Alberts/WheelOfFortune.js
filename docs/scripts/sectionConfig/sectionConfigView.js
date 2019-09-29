var SectionConfigView = /** @class */ (function () {
    function SectionConfigView(pos, id) {
        this._hidden = false;
        this.rootElement = document.createElement('div');
        this.rootElement.classList.add('border', 'mb-2');
        var innerContainer = document.createElement('div');
        innerContainer.classList.add('m-2', 'inner-container');
        this._initHeader(pos);
        this.rootElement.appendChild(innerContainer);
        this._initBody(id, innerContainer);
        this._initControls(innerContainer);
    }
    SectionConfigView.prototype._initHeader = function (pos) {
        var _this = this;
        var header = document.createElement('div');
        header.classList.add('p-2', 'border-bottom');
        header.classList.add('section--header');
        this._label = document.createElement('div');
        this._label.innerText = 'Section ' + (pos + 1);
        header.appendChild(this._label);
        header.addEventListener('click', function () {
            _this.rootElement.classList.toggle('hidden');
        });
        this.rootElement.appendChild(header);
    };
    SectionConfigView.prototype._initBody = function (id, container) {
        var root = document.createElement('div');
        root.classList.add('section--body');
        this._idElement = this._createNewConfigElement(root, 'number', 'id', 'ID: ', String(id));
        this._textElement = this._createNewConfigElement(root, 'text', 'text', 'Text: ');
        this._textColorElement = this._createNewConfigElement(root, 'color', 'text-color', 'Text Color: ');
        this._backgroundColorElement = this._createNewConfigElement(root, 'color', 'background-color', 'Background Color: ');
        container.appendChild(root);
    };
    SectionConfigView.prototype._initControls = function (container) {
        var _this = this;
        var root = document.createElement('div');
        root.classList.add('mt-2');
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
        upButton.classList.add('form-control', 'btn', 'btn-outline-dark', 'mt-2');
        rmButton.classList.add('form-control', 'btn', 'btn-danger', 'mt-2');
        downButton.classList.add('form-control', 'btn', 'btn-outline-dark', 'mt-2');
        root.appendChild(upButton);
        root.appendChild(rmButton);
        root.appendChild(downButton);
        container.appendChild(root);
    };
    SectionConfigView.prototype._createNewConfigElement = function (root, type, name, label, defaultValue) {
        var _this = this;
        if (defaultValue === void 0) { defaultValue = ''; }
        var wrapper = document.createElement('div');
        var labelElem = document.createElement('div');
        labelElem.innerText = label;
        wrapper.appendChild(labelElem);
        root.appendChild(wrapper);
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
        elem.value = defaultValue;
        elem.addEventListener('change', function () { return _this._onChange(); });
        wrapper.appendChild(elem);
        return elem;
    };
    SectionConfigView.prototype._onChange = function () {
        this.onChange(Number(this._idElement.value), this._textElement.value, this._textColorElement.value, this._backgroundColorElement.value);
    };
    SectionConfigView.prototype.changeSection = function (pos) {
        this._label.innerText = 'Section ' + (pos + 1);
    };
    return SectionConfigView;
}());
//# sourceMappingURL=sectionConfigView.js.map