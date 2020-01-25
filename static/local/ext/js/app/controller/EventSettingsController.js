import { Controller } from "./../../core/Controller.js";
import { Config } from '../../conf/Config.js';
export class EventSettingsController extends Controller {
    constructor() {
        super();
        this._initializeElements();
        this._getPageMessages();
    }
    _initializeElements() {
        this._elements = new Array();
        this._elements['title'] = document.querySelector('title');
        this._elements['page-title'] = document.querySelector('#page-title');
    }
    _getPageMessages() {
        fetch(Config.LOCAL_MESSAGES_PATH)
            .then(response => response.json())
            .then(data => {
            this._buildPageMessages(data);
        });
        this._changelog("da");
    }
    _buildPageMessages(data) {
    }
}
//# sourceMappingURL=EventSettingsController.js.map