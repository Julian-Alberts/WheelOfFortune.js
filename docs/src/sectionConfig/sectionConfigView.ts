class SectionConfigView {
    
    public rootElement: HTMLElement;
    public onChange: (id: number, text: string, textColor: string, backgroundColor: string) => void;
    public onChangePosition: (dir: -1 | 1) => void;
    public onRemove: () => void;
    private _label: HTMLDivElement;
    private _idElement: HTMLInputElement;
    private _textElement: HTMLInputElement;
    private _textColorElement: HTMLInputElement;
    private _backgroundColorElement: HTMLInputElement;

    public constructor(pos: number, id: number) {
        this.rootElement = document.createElement('div');
        this.rootElement.classList.add('border', 'mb-2');

        this._initHeader(pos);

        this._initBody(id);

        this._initControls();
    }

    private _initHeader(pos: number) {
        const header = document.createElement('div');
        header.classList.add('p-2', 'border-bottom');
        header.classList.add('section--header');

        this._label = document.createElement('div');
        this._label.innerText = 'Section ' + (pos + 1);
        header.appendChild(this._label);

        const hideButton = document.createElement('button');
        hideButton.classList.add('btn');
        hideButton.innerText = 'Hide';

        hideButton.addEventListener('click', () => {
            this.rootElement.classList.toggle('hidden');
        });

        this.rootElement.appendChild(header);
    }

    private _initBody(id: number) {
        const root = document.createElement('div');
        root.classList.add('m-2');
        root.classList.add('section--body');
        this._idElement = this._createNewConfigElement(root, 'number', 'id', 'ID: ', String(id));
        this._textElement = this._createNewConfigElement(root, 'text', 'text', 'Text: ');
        this._textColorElement = this._createNewConfigElement(root, 'color', 'text-color', 'Text Color: ');
        this._backgroundColorElement = this._createNewConfigElement(root, 'color', 'background-color', 'Background Color: ');
        this.rootElement.appendChild(root);
    }

    private _initControls() {
        const root = document.createElement('div');
        root.classList.add('m-2');

        const upButton = document.createElement('button');
        upButton.innerText = 'Up';
        upButton.addEventListener('click', () => {
            this.onChangePosition(-1);
        });
        const rmButton = document.createElement('button');
        rmButton.innerText = 'Remove';
        rmButton.addEventListener('click', () => {
            this.onRemove();
        });
        const downButton = document.createElement('button');
        downButton.innerText = 'Down';
        downButton.addEventListener('click', () => {
            this.onChangePosition(1);
        });
        
        upButton.classList.add('form-control', 'btn', 'btn-outline-dark', 'mt-2');
        rmButton.classList.add('form-control', 'btn', 'btn-danger', 'mt-2');
        downButton.classList.add('form-control', 'btn', 'btn-outline-dark', 'mt-2');
        root.appendChild(upButton);
        root.appendChild(rmButton);
        root.appendChild(downButton);

        this.rootElement.appendChild(root);
    }

    private _createNewConfigElement(root: HTMLElement, type: string, name: string, label: string, defaultValue = '') {
        const wrapper = document.createElement('div');
        const labelElem = document.createElement('div');
        labelElem.innerText = label;
        wrapper.appendChild(labelElem);
        root.appendChild(wrapper);
        if (type === 'color') {
            const color = document.createElement('input');
            wrapper.appendChild(color);
            wrapper.classList.add('color-input');
            color.type = 'color';
            color.style.display = 'none';
            const text = document.createElement('input');
            wrapper.appendChild(text);
            text.name = name;
            text.classList.add('form-control');
            const button = document.createElement('button');
            button.classList.add('color-button','form-control');
            wrapper.appendChild(button);
            button.addEventListener('click', () => {
                color.click();
            });

            color.addEventListener('change', () => {
                text.value = color.value;
                button.style.backgroundColor = text.value;
                this._onChange();
            });

            text.addEventListener('change', () => {
                button.style.backgroundColor = text.value;
                this._onChange();
            });
            return text;
        }
        const elem = document.createElement('input');
        elem.classList.add('form-control');
        elem.type = type;
        elem.name = name;
        elem.value = defaultValue;
        elem.addEventListener('change', () => this._onChange());
        wrapper.appendChild(elem);
        return elem;
    }

    private _onChange() {
        this.onChange(
            Number(this._idElement.value), 
            this._textElement.value, 
            this._textColorElement.value, 
            this._backgroundColorElement.value
        );
    }

    changeSection(pos: number) {
        this._label.innerText = 'Section '+ (pos + 1);
    }

}
