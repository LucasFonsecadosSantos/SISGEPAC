import { Controller } from "./../../core/Controller.js";
import { Logger } from "./../../util/Logger.js";
import { Config, DataEntity } from "./../../conf/Config.js";
import { MessageModel } from '../model/MessageModel.js';
import { EventModel } from './../model/EventModel.js';
export class DashboardController extends Controller {
    constructor(projectStatus) {
        super();
        this._messagesModel = new MessageModel();
        this._eventModel = new EventModel();
        this._initializeElements();
        this._getData();
        if (!projectStatus) {
            //@ts-ignore
            $('#eventSettingsModal').modal('show');
        }
        else {
            this._populateLanguageData();
            this._populateEventData();
            this._populateSpeakerData();
            this._populateSponsorshipData();
            this._populateOrganizationData();
        }
    }
    _initializeElements() {
        this._elements = new Array();
        this._elements['title'] = document.querySelector('title');
    }
    _getData() {
        this._messagesData = this._messagesModel.all();
        this._sponsorshipData = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SPONSORSHIP_));
        this._speakerData = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SPEAKER_));
        this._eventData = this._eventModel.all();
        this._organizationData = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._ORGANIZATION_));
        this._languagesData = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._LANGUAGE_));
    }
    _buildPageMessages(data) {
        data['index']['pt-BR'].forEach(message => {
            if (message['id']) {
            }
            else if (message['tag']) {
                this._elements[message['tag']].textContent = message['text'];
            }
        });
    }
    _populateEventData() {
        this._eventData
            .then(response => response.json())
            .then(data => {
        })
            .catch(error => { Logger.log(error); });
    }
    _populateSpeakerData() {
        this._speakerData
            .then(response => response.json())
            .then(data => {
        })
            .catch(error => { Logger.log(error); });
    }
    _populateOrganizationData() {
        this._organizationData
            .then(response => response.json())
            .then(data => {
        })
            .catch(error => { Logger.log(error); });
    }
    _populateSponsorshipData() {
        this._sponsorshipData
            .then(response => response.json())
            .then(data => {
        })
            .catch(error => { Logger.log(error); });
    }
    _populateLanguageData() { }
}
//# sourceMappingURL=DashboardController.js.map