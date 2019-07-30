class WofConfigView {

    public onChange: (config: string[], value: string | number) => void;

    constructor(root: HTMLElement) {
        const stroke = [
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

        const indicator = [
            {
                type: 'color',
                label: 'color',
                path: ['indicator', 'color']
            },
            {
                label: 'style',
                type: 'select',
                values: ['none','static'],
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

        const pins = [
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

        const text = [
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

    private _createGroupe(name: string, group: {label: string, type: string, values?: string[], path: string[]}[]): HTMLElement {
        const root = document.createElement('div');
        root.classList.add('border','p-2', 'mb-2');
        const groupField = document.createElement('div');
        groupField.innerText = name;
        root.appendChild(groupField);
        group.forEach(field => {
            const wrapper = document.createElement('div');
            const label = document.createElement('div');
            label.innerText = field.label;
            wrapper.appendChild(label);
            switch(field.type) {
            case 'color':
                const colorRoot = document.createElement('div');
                colorRoot.classList.add('color-input');
                const color = document.createElement('input');
                colorRoot.appendChild(color);
                color.type = 'color';
                color.style.display = 'none';
                const text = document.createElement('input');
                colorRoot.appendChild(text);
                text.name = field.label;
                text.classList.add('form-control');
                const button = document.createElement('button');
                button.classList.add('color-button','form-control');
                colorRoot.appendChild(button);
                button.addEventListener('click', () => {
                    color.click();
                });
    
                color.addEventListener('change', () => {
                    text.value = color.value;
                    button.style.backgroundColor = text.value;
                    this.onChange(field.path, text.value);
                });
    
                text.addEventListener('change', () => {
                    button.style.backgroundColor = text.value;
                    this.onChange(field.path, text.value);
                });
                wrapper.appendChild(colorRoot);
                break;
            case 'select':
                const select = document.createElement('select'); 
                select.classList.add('form-control');
                select.name = field.label;
                field.values.forEach(val => {
                    const opt = document.createElement('option');
                    select.appendChild(opt);
                    opt.innerText = val;
                });
                select.addEventListener('change', () => {
                    this.onChange(field.path, select.value);
                });
                wrapper.appendChild(select);
                break;
            default:
                const input = document.createElement('input');
                input.classList.add('form-control');
                input.type = field.type;
                input.name = field.label;
                input.addEventListener('change', () => {
                    if (field.type === 'number') {
                        this.onChange(field.path, Number(input.value));
                    } else {
                        this.onChange(field.path, input.value);
                    }
                });
                wrapper.appendChild(input);
                break;
            }
            root.appendChild(wrapper);
        });
        return root;
    }

}
