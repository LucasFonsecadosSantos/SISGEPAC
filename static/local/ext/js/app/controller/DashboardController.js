import { Controller } from './../../core/Controller.js';
import { Logger } from './../../util/Logger.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { DataEntity } from './../../conf/Config.js';
import { MessageModel } from './../model/MessageModel.js';
import { EventModel } from './../model/EventModel.js';
import { SpeakerModel } from './../model/SpeakerModel.js';
import { LanguageModel } from './../model/LanguageModel.js';
export class DashboardController extends Controller {
    constructor() {
        super();
        this._messagesModel = new MessageModel(DataEntity._DASHBOARD_MESSAGES_);
        this._eventModel = new EventModel();
        this._languageModel = new LanguageModel();
        this._speakerModel = new SpeakerModel();
        this._initializeElements();
        this._getPageMessages();
        //TODO HERE
        if (true) {
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
        this._elements['event-occurrence-title'] = document.querySelector('#event-occurrence-title');
        this._elements['event-information-title'] = document.querySelector('#event-information-title');
    }
    _getPageMessages() {
        this._messagesData = this._messagesModel.all();
        this._messagesData.then(data => {
            let elementKey;
            data['pt-BR'].forEach(message => {
                Object.keys(message).forEach(key => {
                    MessageBuilder.buildMessage(this._elements[(message['id']) ? message['id'] : (message['tag'])], key, message[key]);
                });
            });
        })
            .catch(error => Logger.log(error));
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