import { SpeakerTableComponent }    from './../app/components/SpeakerTableComponent.js';
import { Component }                from './../core/Component.js';
import { ActivityTableComponent }   from './../app/components/ActivityTableComponent.js';

export enum ComponentEnum {

    SPEAKER_TABLE,
    ACTIVITY_TABLE

}

export class ComponentFactory {

    public static readonly component:   ComponentEnum;

    private static _componentInstancesMap: Map<ComponentEnum, Component> = new Map<ComponentEnum, any>([

        [ComponentEnum.SPEAKER_TABLE,   SpeakerTableComponent],
        [ComponentEnum.ACTIVITY_TABLE,  ActivityTableComponent]

    ]);

    public static renderComponent(component: ComponentEnum, data: Object): DocumentFragment {
    
        let object = this._componentInstancesMap.get(component);
        //@ts-ignore
        let componentInstance = new object();
        return componentInstance.getStructure(data);
    
    }

}