import { Controller } from "./../../core/Controller.js";
export class SpeakerController extends Controller {
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
        fetch('/local/data/messages.json')
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
//# sourceMappingURL=SpeakerController.js.map