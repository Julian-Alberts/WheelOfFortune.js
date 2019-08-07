class OverlayView {

    private _codeTextArea: HTMLTextAreaElement;
    private readonly codeTemplate = 
    '<canvas id="wheel-of-fortune"></canvas>\n'+
    '<button id="wheel-of-fortune--spin">Spin</button>\n'+
    '<output id="wheel-of-fortune--output"></output>\n'+
    '<script>\n'+
        '\tvar wheelOfFortune = new WheelOfFortune(document.getElementById(\'wheel-of-fortune\'), {{sections}}, function(section) {\n'+
            '\t\tdocument.getElementById(\'wheel-of-fortune--output\').value = section.text;\n' +
        '}, {{config}});\n'+
        '\tdocument.getElementById(\'wheel-of-fortune--spin\').addEventListener(\'click\', function() {wheelOfFortune.spin()});\n'+
    '</script>\n';

    constructor(sections: SectionData[], config: WheelOfFortuneConfig) {
        const overlayContainer = document.createElement('div');
        overlayContainer.addEventListener('click', (e) => {
            if(e.target === overlayContainer) {
                document.body.removeChild(overlayContainer);
            }
        });
        overlayContainer.classList.add('overlay--wrapper');
        const overlay = document.createElement('div');
        overlay.classList.add('container-fluid', 'overlay');
        this._codeTextArea = document.createElement('textarea');
        this._codeTextArea.classList.add('form-control');
        this._codeTextArea.readOnly = true;
        overlay.appendChild(this._codeTextArea);
        overlayContainer.appendChild(overlay);
        document.body.appendChild(overlayContainer);
        this.updateCode(sections, config);
    }

    public updateCode(sections: SectionData[], config: WheelOfFortuneConfig) {
        this._codeTextArea.value = this.codeTemplate
            .replace('{{sections}}', JSON.stringify(sections))
            .replace('{{config}}', JSON.stringify(config));
    }

}
