import { Controller }           from "./../../core/Controller.js";
import { DataEntity, Config }   from '../../conf/Config.js';

export class EventSettingsController extends Controller {

    private _elements: Array<HTMLElement>;

    constructor(projectStatus: boolean) {

        super(projectStatus);
        this._initializeElements();
        this._getPageMessages();

    }

    private _initializeElements(): void {

        this._elements = new Array<HTMLElement>();
        

        this._elements['title'] = document.querySelector('title');
        this._elements['page-title'] = document.querySelector('#page-title')

    }

    private _getPageMessages(): void {
        
        fetch(Config.LOCAL_MESSAGES_PATH)
            
            .then(response => response.json())
            
            .then(data => {

                this._buildPageMessages(data);

            });

    }

    private _buildPageMessages(data) {

    }


}