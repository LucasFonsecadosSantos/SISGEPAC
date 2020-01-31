import { Controller } from "./../../core/Controller.js";
import { Logger } from "./../../util/Logger.js";
import { DataEntity } from "./../../conf/Config.js";
import { MessageModel } from '../model/MessageModel.js';
import { EventModel } from './../model/EventModel.js';
export class DashboardController extends Controller {
    constructor(projectStatus) {
        super();
        this._messagesModel = new MessageModel(DataEntity._DASHBOARD_MESSAGES_);
        this._eventModel = new EventModel();
        this._initializeElements();
        this._getPageMessages();
        if (!projectStatus) {
            //@ts-ignore
            $('#eventSettingsModal').modal('show');
        }
        else {
            this._populateLanguageData();
            this._populateEventData();
            this._populateSpeakerData();
            // this._populateSponsorshipData();
            // this._populateOrganizationData();
        }
    }
    _initializeElements() {
        this._elements = new Array();
        this._elements['title'] = document.querySelector('title');
    }
    _getPageMessages() {
        this._messagesData = this._messagesModel.all();
    }
    _populateLanguageData() {
        this._languageData = this._languageModel.filter('using', true);
        this._languageData.then(data => console.log(data));
    }
    _populateEventData() {
        this._eventData = this._eventModel.all();
        this._eventData
            .then(data => {
        })
            .catch(error => { Logger.log(error); });
    }
    _populateSpeakerData() {
        this._speakerData = this._speakerModel.all();
        this._speakerData
            .then(data => {
        })
            .catch(error => { Logger.log(error); });
    }
}
//# sourceMappingURL=DashboardController.js.map