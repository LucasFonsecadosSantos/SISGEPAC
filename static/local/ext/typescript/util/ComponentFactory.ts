import { SpeakerTableComponent }    from './../app/components/SpeakerTableComponent.js';
import { Component }                from './../core/Component.js';

export enum ComponentEnum {

    SPEAKER_TABLE

}

export class ComponentFactory {

    public static readonly component:   ComponentEnum;

    private static _componentInstancesMap: Map<ComponentEnum, Component> = new Map<ComponentEnum, any>([

        [ComponentEnum.SPEAKER_TABLE, SpeakerTableComponent]

    ]);

    public static renderComponent(component: ComponentEnum, data: Object): DocumentFragment {
    
        let object = this._componentInstancesMap.get(component);
        //@ts-ignore
        let componentInstance = new object();
        return componentInstance.getStructure(data);
    
    }

}