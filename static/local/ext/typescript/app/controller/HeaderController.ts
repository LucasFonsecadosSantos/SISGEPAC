import { Controller } from "./../../core/Controller.js";
import { DataEntity, Config } from './../../conf/Config.js';

export class HeaderController extends Controller {

    private _titleElement: HTMLTitleElement;
    private _textElements: Array<HTMLElement>;
    private _inputElements: Array<HTMLElement>;
    private _buttonElements: Array<HTMLElement>;
    private _changelogContent: HTMLElement;

    constructor() {

        super();
        this._initializeElements();
        this._getPageMessages();
        this._getPageContent();
        this._buildPageContent();

    }

    private _initializeElements(): void {

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

    private _getPageContent(): void {

    }

    private _buildPageContent(): void {
        
    }

}