import { Controller } from "./../../core/Controller.js";
import { Logger } from "../../util/Logger.js";
export class SpeakerController extends Controller {
    constructor(projectStatus) {
        super(projectStatus);
        this._initializeElements();
        this._getData();
        this._getPageMessages();
        this._getPageContent();
    }
    _initializeElements() {
    }
    _getData() {
        this._messages = this._messageModel.all();
        this._speakerData = this._speakerModel.all();
    }
    _getPageMessages() {
        this._messages
            .then(data => {
        })
            .catch(error => Logger.log(error));
    }
    _getPageContent() {
        this._speakerData
            .then(data => {
        })
            .catch(error => Logger.log(error));
    }
    search(key, value) {
        let speaker = this._speakerModel.find(key, value);
    }
}
//# sourceMappingURL=SpeakerController.js.map