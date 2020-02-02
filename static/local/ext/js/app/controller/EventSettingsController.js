import { Controller } from "./../../core/Controller.js";
import { DataEntity } from './../../conf/Config.js';
import { MessageModel } from "./../model/MessageModel.js";
import { EventModel } from "./../model/EventModel.js";
import { Logger } from "./../../util/Logger.js";
export class EventSettingsController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._EVENT_SETTINGS_MESSAGE_);
        this._eventModel = new EventModel();
        this._initializeElements();
        this._getPageMessages();
        this._populateContent();
    }
    _initializeElements() {
        this._elements = new Array();
        this._elements['title'] = document.querySelector('title');
        this._elements['page-title'] = document.querySelector('#page-title');
    }
    _getPageMessages() {
        this._messages = this._messageModel.all();
        this._messages.then(data => {
        })
            .catch(error => Logger.log(error));
    }
    _populateContent() {
        this._eventData = this._eventModel.all();
        this._eventData.then(data => {
        })
            .catch(error => Logger.log(error));
    }
}
//# sourceMappingURL=EventSettingsController.js.map