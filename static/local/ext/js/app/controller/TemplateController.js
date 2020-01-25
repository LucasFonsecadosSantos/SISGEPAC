import { Controller } from "./../../core/Controller.js";
export class TemplateController extends Controller {
    constructor(projectStatus) {
        super(projectStatus);
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
//# sourceMappingURL=TemplateController.js.map