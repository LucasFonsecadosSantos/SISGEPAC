import { Controller } from "./../../core/Controller.js";
import { Config } from './../../conf/Config.js';
export class HeaderController extends Controller {
    constructor() {
        super();
        this._initializeElements();
        this._getPageMessages();
        this._getPageContent();
        this._buildPageContent();
    }
    _initializeElements() {
    }
    _getPageMessages() {
        fetch(Config.LOCAL_MESSAGES_PATH)
            .then(response => response.json())
            .then(data => {
            this._buildPageMessages(data);
        });
    }
    _buildPageMessages(data) {
    }
    _getPageContent() {
    }
    _buildPageContent() {
    }
}
//# sourceMappingURL=HeaderController.js.map