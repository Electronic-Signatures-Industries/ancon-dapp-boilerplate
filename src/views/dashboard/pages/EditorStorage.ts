export class EditorStorage {
    public static get abi() {
        return localStorage.getItem('mdv:gui:abi')
    }
    public static set abi(value: string) {
        localStorage.setItem('mdv:gui:abi', value)
    }
    public static get modelTemplate() {
        return localStorage.getItem('mdv:gui:modelTemplate')
    }
    public static set modelTemplate(value: string) {
        localStorage.setItem('mdv:gui:modelTemplate', value)
    }
    public static get wfTemplate() {
        return localStorage.getItem('mdv:gui:wfTemplate')
    }
    public static set wfTemplate(value: string) {
        localStorage.setItem('mdv:gui:wfTemplate', value)
    }
    public static get wfTemplateDesigner() {
        return localStorage.getItem('mdv:gui:wfTemplateDesigner')
    }
    public static set wfTemplateDesigner(value: string) {
        localStorage.setItem('mdv:gui:wfTemplateDesigner', value)
    }
    public static get deployedModelTemplateAddress() {
        return localStorage.getItem('mdv:gui:deployedModelTemplateAddress')
    }
    public static set deployedModelTemplateAddress(value: string) {
        localStorage.setItem('mdv:gui:deployedModelTemplateAddress', value)
    }
}