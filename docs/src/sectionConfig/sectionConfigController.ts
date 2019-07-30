
class SectionCofingController {

    private _sectionConfigModel: SectionConfigModel;
    private _sectionConfigView: SectionConfigView;
    public onChange: (position: number, sectionConfig: SectionConfigModel) => void;
    public onSwitchPosition: (pos: number, dir: -1 | 1) => void;
    public onRemove: (position: number) => void;

    public constructor(root: HTMLElement, public position: number) {
        this._sectionConfigModel = new SectionConfigModel();
        this._sectionConfigView = new SectionConfigView();
        this._sectionConfigView.onChange = (id, text, textColor, backgroundColor) => {
            this._sectionConfigModel.id = id;
            this._sectionConfigModel.text = text;
            this._sectionConfigModel.textColor = textColor;
            this._sectionConfigModel.backgroundColor = backgroundColor;
            this.onChange(this.position, this._sectionConfigModel);
        }
        this._sectionConfigView.onChangePosition = (dir) => this.onSwitchPosition(this.position, dir);
        this._sectionConfigView.onRemove = () => this.onRemove(this.position);
        root.appendChild(this._sectionConfigView.rootElement);
    }

    public getSectionConfig(): SectionConfigModel {
        return this._sectionConfigModel;
    }

}
