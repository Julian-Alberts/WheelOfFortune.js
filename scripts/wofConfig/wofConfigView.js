var WofConfigView = /** @class */ (function () {
    function WofConfigView(root) {
        var stroke = [
            {
                type: 'color',
                label: 'color',
                path: ['stroke', 'color']
            },
            {
                label: 'width',
                type: 'number',
                path: ['stroke', 'width']
            }
        ];
        root.appendChild(this._createGroupe('Stroke', stroke));
        var indicator = [
            {
                type: 'color',
                label: 'color',
                path: ['indicator', 'color']
            },
            {
                label: 'style',
                type: 'select',
                values: ['none', 'static'],
                path: ['indicator', 'style']
            },
            {
                label: 'width',
                type: 'number',
                path: ['indicator', 'width']
            },
            {
                label: 'height',
                type: 'number',
                path: ['indicator', 'height']
            }
        ];
        root.appendChild(this._createGroupe('Indicator', indicator));
        var pins = [
            {
                type: 'color',
                label: 'color',
                path: ['pins', 'color']
            },
            {
                label: 'size',
                type: 'number',
                path: ['pins', 'size']
            },
            {
                label: 'margin',
                type: 'number',
                path: ['pins', 'margin']
            }
        ];
        root.appendChild(this._createGroupe('Pins', pins));
        var text = [
            {
                label: 'color',
                type: 'color',
                path: ['text', 'color']
            },
            {
                label: 'font',
                type: 'text',
                path: ['text', 'font']
            },
            {
                label: 'size',
                type: 'number',
                path: ['text', 'size']
            }
        ];
        root.appendChild(this._createGroupe('Text', text));
    }
    WofConfigView.prototype._createGroupe = function (name, group) {
        var _this = this;
        var root = document.createElement('div');
        root.classList.add('border', 'p-2', 'mb-2');
        var groupField = document.createElement('div');
        groupField.innerText = name;
        root.appendChild(groupField);
        group.forEach(function (field) {
            var wrapper = document.createElement('div');
            var label = document.createElement('div');
            label.innerText = field.label;
            wrapper.appendChild(label);
            switch (field.type) {
                case 'color':
                    var colorRoot = document.createElement('div');
                    colorRoot.classList.add('color-input');
                    var color_1 = document.createElement('input');
                    colorRoot.appendChild(color_1);
                    color_1.type = 'color';
                    color_1.style.display = 'none';
                    var text_1 = document.createElement('input');
                    colorRoot.appendChild(text_1);
                    text_1.name = field.label;
                    text_1.classList.add('form-control');
                    var button_1 = document.createElement('button');
                    button_1.classList.add('color-button', 'form-control');
                    colorRoot.appendChild(button_1);
                    button_1.addEventListener('click', function () {
                        color_1.click();
                    });
                    color_1.addEventListener('change', function () {
                        text_1.value = color_1.value;
                        button_1.style.backgroundColor = text_1.value;
                        _this.onChange(field.path, text_1.value);
                    });
                    text_1.addEventListener('change', function () {
                        button_1.style.backgroundColor = text_1.value;
                        _this.onChange(field.path, text_1.value);
                    });
                    wrapper.appendChild(colorRoot);
                    break;
                case 'select':
                    var select_1 = document.createElement('select');
                    select_1.classList.add('form-control');
                    select_1.name = field.label;
                    field.values.forEach(function (val) {
                        var opt = document.createElement('option');
                        select_1.appendChild(opt);
                        opt.innerText = val;
                    });
                    select_1.addEventListener('change', function () {
                        _this.onChange(field.path, select_1.value);
                    });
                    wrapper.appendChild(select_1);
                    break;
                default:
                    var input_1 = document.createElement('input');
                    input_1.classList.add('form-control');
                    input_1.type = field.type;
                    input_1.name = field.label;
                    input_1.addEventListener('change', function () {
                        if (field.type === 'number') {
                            _this.onChange(field.path, Number(input_1.value));
                        }
                        else {
                            _this.onChange(field.path, input_1.value);
                        }
                    });
                    wrapper.appendChild(input_1);
                    break;
            }
            root.appendChild(wrapper);
        });
        return root;
    };
    return WofConfigView;
}());
//# sourceMappingURL=wofConfigView.js.map