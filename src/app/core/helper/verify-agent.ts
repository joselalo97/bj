export class VerificAgent {

    public visible: boolean = false

    public verify(): boolean {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');
        if (msie > 0) {
            return this.visible = false
        } else
            if (trident > 0) {
                return this.visible = false
            } else {
                return this.visible = true
            }
    }
}