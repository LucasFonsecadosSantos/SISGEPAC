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
        // if (true) {
        //     //@ts-ignore
        //     $('#eventSettingsModal').modal('show');
        // } else {
        //this._populateLanguageData();
        this._populateCard02();
        this._populateCard03();
        //this._populateSpeakerData();
        // this._populateSponsorshipData();
        // this._populateOrganizationData();
        //}
    }
    _initializeElements() {
        this._elements = new Array();
        this._elements['title'] = document.querySelector('title');
        this._elements['event-occurrence-title'] = document.querySelector('#event-occurrence-title');
        this._elements['event-information-title'] = document.querySelector('#event-information-title');
        //Card 02
        this._elements['card02_label_event-name'] = document.querySelector('#card02_label_event-name');
        this._elements['card02_data_event-name'] = document.querySelector('#card02_data_event-name');
        this._elements['card02_label_event-edition'] = document.querySelector('#card02_label_event-edition');
        this._elements['card02_data_event-edition'] = document.querySelector('#card02_data_event-edition');
        this._elements['card02_label_event-description'] = document.querySelector('#card02_label_event-description');
        this._elements['card02_data_event-description'] = document.querySelector('#card02_data_event-description');
        this._elements['card02_label_event-institute'] = document.querySelector('#card02_label_event-institute');
        this._elements['card02_data_event-institute'] = document.querySelector('#card02_data_event-institute');
        this._elements['card02_label_event-type'] = document.querySelector('#card02_label_event-type');
        this._elements['card02_data_event-type'] = document.querySelector('#card02_data_event-type');
        this._elements['card02_label_event-area'] = document.querySelector('#card02_label_event-area');
        this._elements['card02_data_event-area'] = document.querySelector('#card02_data_event-area');
        this._elements['card02_label_contact-info'] = document.querySelector('#card02_label_contact-info');
        //Card 03
        this._elements['card03_label_event-twitter'] = document.querySelector('#card03_label_event-twitter');
        this._elements['card03_data_event-twitter'] = document.querySelector('#card03_data_event-twitter');
        this._elements['card03_label_event-facebook'] = document.querySelector('#card03_label_event-facebook');
        this._elements['card03_data_event-facebook'] = document.querySelector('#card03_data_event-facebook');
        this._elements['card03_label_event-linkedin'] = document.querySelector('#card03_label_event-linkedin');
        this._elements['card03_data_event-linkedin'] = document.querySelector('#card03_data_event-linkedin');
        this._elements['card03_label_event-youtube'] = document.querySelector('#card03_label_event-youtube');
        this._elements['card03_data_event-youtube'] = document.querySelector('#card03_data_event-youtube');
        this._elements['card03_label_event-telephone'] = document.querySelector('#card03_label_event-telephone');
        this._elements['card03_data_event-telephone'] = document.querySelector('#card03_data_event-telephone');
        this._elements['card03_label_event-email'] = document.querySelector('#card03_label_event-email');
        this._elements['card03_data_event-email'] = document.querySelector('#card03_data_event-email');
        this._elements['card03_label_event-website'] = document.querySelector('#card03_label_event-website');
        this._elements['card03_data_event-website'] = document.querySelector('#card03_data_event-website');
        this._elements['card03_label_event-instagram'] = document.querySelector('#card03_label_event-instagram');
        this._elements['card03_data_event-instagram'] = document.querySelector('#card03_data_event-instagram');
        this._elements['card03_label_event-contact-info'] = document.querySelector('#card03_label_event-contact-info');
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
    _populateCard02() {
        this._eventData = this._eventModel.all();
        this._eventData
            .then(data => {
            this._elements['card02_data_event-name'].textContent = data['title'];
            this._elements['card02_data_event-description'].textContent = data['description'];
            this._elements['card02_data_event-institute'].textContent = data['institute'];
            this._elements['card02_data_event-type'].textContent = data['event-type'];
            this._elements['card02_data_event-area'].textContent = data['area'];
            this._elements['card02_data_event-edition'].textContent = data['edition'];
        })
            .catch(error => { Logger.log(error); });
    }
    _populateCard03() {
        this._eventData = this._eventModel.all();
        this._eventData
            .then(data => {
            Object.keys(data['social-networks']).forEach(key => {
                this._elements['card03_data_event-' + key].textContent = data['social-networks'][key];
            });
            this._elements['card03_data_event-website'].textContent = data['website'];
            this._elements['card03_data_event-email'].textContent = data['email'];
            data['telephone'].forEach(telephone => {
                this._elements['card03_data_event-telephone'].textContent += telephone;
            });
        })
            .catch(error => Logger.log(error));
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