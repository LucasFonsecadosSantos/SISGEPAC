import { Controller } from './../../core/Controller.js';
import { ActivityModel } from './../model/ActivityModel.js';
import { MessageModel } from './../model/MessageModel.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { DataEntity } from './../../conf/Config.js';
import { Logger } from './../../util/Logger.js';
import { ActivityRegisterModalElements } from './../elements/ActivityRegisterModelElements.js';
import { SpeakerModel } from './../model/SpeakerModel.js';
export class ActivityRegisterModalController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._ACTIVITY_REGISTER_MODAL_MESSAGES_);
        this._activityModel = new ActivityModel();
        this._elements = ActivityRegisterModalElements.ELEMENTS;
        this._getPageMessages();
    }
    _getPageMessages() {
        this._messageData = this._messageModel.all();
        this._messageData.then(data => {
            let elementKey;
            data['pt-BR'].forEach(message => {
                Object.keys(message).forEach(key => {
                    MessageBuilder.buildMessage(this._elements.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                });
            });
        })
            .catch(error => Logger.log(error));
    }
    create() {
        //@ts-ignore
        $('#activityRegisterModal').modal('show');
        document.querySelector('#activityRegisterModal').addEventListener('DOMAttrModified', event => {
            //@ts-ignore
            if (document.querySelector('#activityRegisterModal').style.display === 'none') {
                window.location.href = "";
            }
        });
        //this._clearInputs();
        this._populateSpeakerList();
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_update').classList.add('d-none');
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_create').classList.remove('d-none');
    }
    _populateSpeakerList() {
        let speakerModel = new SpeakerModel();
        speakerModel.all().then(data => {
            let fragment = document.createDocumentFragment();
            let optionElement;
            data.forEach(speaker => {
                alert(speaker);
                optionElement = document.createElement('OPTION');
                optionElement.setAttribute('value', speaker['id']);
                optionElement.textContent = speaker['name'];
                fragment.appendChild(optionElement);
            });
            ActivityRegisterModalElements.ELEMENTS.get('activity_register_data_responsible').appendChild(fragment);
        })
            .catch(error => Logger.log('Activity Register Modal Controller: ' + error));
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_data_responsible');
    }
    _clearInputs() {
        this._elements.forEach(element => {
            if (element.nodeName === 'INPUT') {
                element.nodeValue = "";
            }
        });
    }
    update(id) {
        document.querySelector('#activityRegisterModal').addEventListener('DOMAttrModified', event => {
            //@ts-ignore
            if (document.querySelector('#activityRegisterModal').style.display === 'none') {
                window.location.href = "";
            }
        });
    }
    delete(id) {
        this._activityModel.delete('id', id);
        setTimeout(() => window.location.hash = '', 2000);
    }
}
//# sourceMappingURL=ActivityRegisterModalController.js.map