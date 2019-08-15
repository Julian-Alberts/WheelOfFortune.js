
class SectionCofingController {

    private _sectionConfigModel: SectionConfigModel;
    private _sectionConfigView: SectionConfigView;
    public onChange: (position: number, sectionConfig: SectionConfigModel) => void;
    public onSwitchPosition: (pos: number, dir: -1 | 1) => void;
    public onRemove: (position: number) => void;

    public constructor(root: HTMLElement, private _position: number) {
        this._sectionConfigModel = new SectionConfigModel();
        this._sectionConfigView = new SectionConfigView(_position);
        this._sectionConfigView.onChange = (id, text, textColor, backgroundColor) => {
            this._sectionConfigModel.id = id;
            this._sectionConfigModel.text = text;
            this._sectionConfigModel.textColor = textColor;
            this._sectionConfigModel.backgroundColor = backgroundColor;
            this.onChange(this._position, this._sectionConfigModel);
        }
        this._sectionConfigView.onChangePosition = (dir) => this.onSwitchPosition(this._position, dir);
        this._sectionConfigView.onRemove = () => this.onRemove(this._position);
        root.appendChild(this._sectionConfigView.rootElement);
    }

    public getSectionConfig(): SectionConfigModel {
        return this._sectionConfigModel;
    }

    public setPosition(pos: number) {
        this._position = pos;
        this._sectionConfigView.changeSection(pos);
    }

}
