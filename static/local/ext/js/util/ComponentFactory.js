import { SpeakerTableComponent } from './../app/components/SpeakerTableComponent.js';
export var ComponentEnum;
(function (ComponentEnum) {
    ComponentEnum[ComponentEnum["SPEAKER_TABLE"] = 0] = "SPEAKER_TABLE";
})(ComponentEnum || (ComponentEnum = {}));
export class ComponentFactory {
    static renderComponent(component, data) {
        let object = this._componentInstancesMap.get(component);
        //@ts-ignore
        let componentInstance = new object();
        return componentInstance.getStructure(data);
    }
}
ComponentFactory._componentInstancesMap = new Map([
    [ComponentEnum.SPEAKER_TABLE, SpeakerTableComponent]
]);
//# sourceMappingURL=ComponentFactory.js.map