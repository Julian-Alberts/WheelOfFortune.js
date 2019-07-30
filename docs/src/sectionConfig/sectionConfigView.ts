class SectionConfigView {
    
    public rootElement: HTMLElement;
    public onChange: (id: number, text: string, textColor: string, backgroundColor: string) => void;
    public onChangePosition: (dir: -1 | 1) => void;
    public onRemove: () => void;
    private _idElement: HTMLInputElement;
    private _textElement: HTMLInputElement;
    private _textColorElement: HTMLInputElement;
    private _backgroundColorElement: HTMLInputElement;

    public constructor() {
        this.rootElement = document.createElement('div');
        this._idElement = this._createNewConfigElement('number', 'id', 'ID: ');
        this._textElement = this._createNewConfigElement('text', 'text', 'Text: ');
        this._textColorElement = this._createNewConfigElement('color', 'text-color', 'Text Color: ');
        this._backgroundColorElement = this._createNewConfigElement('color', 'background-color', 'Background Color: ');
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
        this.rootElement.classList.add('border', 'p-2', 'mb-2');
        upButton.classList.add('form-control', 'btn', 'btn-outline-dark', 'mt-2');
        rmButton.classList.add('form-control', 'btn', 'btn-danger', 'mt-2');
        downButton.classList.add('form-control', 'btn', 'btn-outline-dark', 'mt-2');
        this.rootElement.appendChild(upButton);
        this.rootElement.appendChild(rmButton);
        this.rootElement.appendChild(downButton);
    }

    private _createNewConfigElement(type: string, name: string, label: string) {
        const wrapper = document.createElement('div');
        const labelElem = document.createElement('div');
        labelElem.innerText = label;
        wrapper.appendChild(labelElem);
        this.rootElement.appendChild(wrapper);
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

}
