import { Controller } from './../../core/Controller.js';
import { ActivityModel } from './../model/ActivityModel.js';
import { MessageModel } from './../model/MessageModel.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { DataEntity } from './../../conf/Config.js';
import { Logger } from './../../util/Logger.js';
import { ActivityRegisterModalElements } from './../elements/ActivityRegisterModelElements.js';
import { SpeakerModel } from './../model/SpeakerModel.js';
import { Updater } from './../../util/Updater.js';
export class ActivityRegisterModalController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._ACTIVITY_REGISTER_MODAL_MESSAGES_);
        this._activityModel = new ActivityModel();
        this._elements = ActivityRegisterModalElements.ELEMENTS;
        this._getPageMessages();
        this._initListeners();
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
        //this._clearInputs();
        this._populateSpeakerList();
        //this._populateTrackList();
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_update').classList.add('d-none');
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_create').classList.remove('d-none');
    }
    // private _populateTrackList(): void {
    //     let trackModel: TrackModel = new trackModel();
    //     trackModel.all().then(data => {
    //         let fragment:       DocumentFragment = document.createDocumentFragment();
    //         let optionElement:  HTMLOptionElement;
    //         data.forEach(speaker => {
    //             alert(speaker);
    //             optionElement = <HTMLOptionElement> document.createElement('OPTION');
    //             optionElement.setAttribute('value', speaker['id']);
    //             optionElement.textContent = speaker['name'];
    //             fragment.appendChild(optionElement);
    //         });
    //          optionElement = <HTMLOptionElement> document.createElement('OPTION');
    //          optionElement.setAttribute('value','');
    //          optionElement.textContent = 'Nenhuma';
    //          fragment.appendChild(optionElement);
    //         ActivityRegisterModalElements.ELEMENTS.get('activity_register_data_responsible').appendChild(fragment);
    //     })
    //     .catch(error => Logger.log('Activity Register Modal Controller: ' + error));
    // }
    _populateSpeakerList() {
        let speakerModel = new SpeakerModel();
        speakerModel.all().then(data => {
            let fragment = document.createDocumentFragment();
            let optionElement;
            data.forEach(speaker => {
                optionElement = document.createElement('OPTION');
                optionElement.setAttribute('value', speaker['id']);
                optionElement.textContent = speaker['name'];
                fragment.appendChild(optionElement);
            });
            ActivityRegisterModalElements.ELEMENTS.get('activity_register_data_responsible').appendChild(fragment);
        })
            .catch(error => Logger.log('Activity Register Modal Controller: ' + error));
    }
    _clearInputs() {
        this._elements.forEach(element => {
            if (element.nodeName === 'INPUT') {
                element.nodeValue = "";
            }
            if (element.nodeName === 'SELECT') {
                element.innerHTML = '';
                let option = document.createElement('OPTION');
                option.setAttribute('select', 'selected');
                option.setAttribute('value', 'default');
                option.textContent = '- SELECIONE -';
                element.appendChild(option);
            }
        });
    }
    update(id) {
        //@ts-ignore
        $('#activityRegisterModal').modal('show');
        //this._clearInputs();
        this._populateActivity();
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_update').classList.remove('d-none');
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_create').classList.add('d-none');
    }
    delete(id) {
        this._activityModel.delete('id', id);
        Updater.updateData();
    }
    _initListeners() {
        this._initCreateButtonListener();
        this._initUpdateButtonListener();
    }
    _initCreateButtonListener() {
        this._elements.get('activity_register_button_create').addEventListener('click', event => {
            document.querySelector('#activityRegisterModal').addEventListener('DOMAttrModified', event => {
                //@ts-ignore
                if (document.querySelector('#activityRegisterModal').style.display === 'none') {
                    Updater.updateData();
                }
            });
            this._activityModel.store({});
        });
    }
    _initUpdateButtonListener() {
        this._elements.get('activity_register_button_update').addEventListener('click', event => {
            document.querySelector('#activityRegisterModal').addEventListener('DOMAttrModified', event => {
                //@ts-ignore
                if (document.querySelector('#activityRegisterModal').style.display === 'none') {
                    Updater.updateData();
                }
            });
            this._activityModel.store({});
        });
    }
    _populateActivity() {
    }
}
//# sourceMappingURL=ActivityRegisterModalController.js.map