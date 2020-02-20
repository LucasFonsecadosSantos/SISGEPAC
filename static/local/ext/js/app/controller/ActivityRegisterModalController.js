import { Controller } from './../../core/Controller.js';
import { ActivityModel } from './../model/ActivityModel.js';
import { MessageModel } from './../model/MessageModel.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { DataEntity } from './../../conf/Config.js';
import { Logger } from './../../util/Logger.js';
import { ActivityRegisterModalElements } from './../elements/ActivityRegisterModelElements.js';
import { SpeakerModel } from './../model/SpeakerModel.js';
import { TrackModel } from './../model/TrackModel.js';
import { Updater } from './../../util/Updater.js';
import { InvalidDataKeyException } from './../../exception/InvalidDataKeyException.js';
import { Identificator } from './../../util/Indentificator.js';
export class ActivityRegisterModalController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._ACTIVITY_REGISTER_MODAL_MESSAGES_);
        this._activityModel = new ActivityModel();
        this._trackModel = new TrackModel();
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
    _populateTrackList() {
        let trackModel = new TrackModel();
        trackModel.all().then(data => {
            let fragment = document.createDocumentFragment();
            let optionElement;
            data.forEach(speaker => {
                alert(speaker);
                optionElement = document.createElement('OPTION');
                optionElement.setAttribute('value', speaker['id']);
                optionElement.textContent = speaker['name'];
                fragment.appendChild(optionElement);
            });
            optionElement = document.createElement('OPTION');
            optionElement.setAttribute('value', '');
            optionElement.textContent = 'Nenhuma';
            fragment.appendChild(optionElement);
            ActivityRegisterModalElements.ELEMENTS.get('activity_register_data_responsible').appendChild(fragment);
        })
            .catch(error => Logger.log('Activity Register Modal Controller: ' + error));
    }
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
            try {
                this._activityModel.imageUpload(new FormData(document.querySelector('#dataFormActivity')))
                    .then(response => {
                    this._activityModel.insert({
                        "id": ((this._elements.get('activity_register_data_id').value === '') || (!this._elements.get('activity_register_data_id').value)) ? Identificator.generateID() : this._elements.get('activity_register_data_id').value,
                        "title": this._elements.get('activity_register_data_title').value,
                        "responsible_id": this._elements.get('activity_register_data_responsible').value,
                        "avatar": ((response['data_name'] === '') || (!response['data_name'])) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                        "description": ActivityRegisterModalElements.ELEMENTS.get('activity_register_data_description').value,
                        "start_date": this._elements.get('activity_register_data_startDate').value,
                        "start_time": this._elements.get('activity_register_data_startTime').value,
                        "end_date": this._elements.get('activity_register_data_endDate').value,
                        "end_time": this._elements.get('activity_register_data_endTime').value,
                        "vacancies": this._elements.get('activity_register_data_vacancies').value,
                        "restriction": this._elements.get('activity_register_data_restriction').value,
                        "track_id": this._elements.get('activity_register_data_track').value,
                        "offering": this._elements.get('activity_register_data_offering').value,
                        "location": this._elements.get('activity_register_data_location').value,
                        //"geo-location":     (ActivityRegisterModalElements.ELEMENTS.get('activity_register_data_title') as HTMLInputElement).value,
                        "price": this._elements.get('activity_register_data_price').value,
                        "show": true
                    });
                })
                    .catch(error => Logger.log(error));
            }
            catch (exception) {
                if (exception instanceof InvalidDataKeyException) {
                    Logger.log("Update Exception: " + exception.message);
                }
            }
            //@ts-ignore
            $('#activityRegisterModal').modal('hide');
        }, false);
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