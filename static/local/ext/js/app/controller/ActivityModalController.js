import { Controller } from './../../core/Controller.js';
import { ActivityModel } from './../model/ActivityModel.js';
import { MessageModel } from './../model/MessageModel.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { DataEntity } from './../../conf/Config.js';
import { Logger } from './../../util/Logger.js';
import { ActivityModalElements } from './../elements/ActivityModelElements.js';
import { SpeakerModel } from './../model/SpeakerModel.js';
import { TrackModel } from './../model/TrackModel.js';
import { Updater } from './../../util/Updater.js';
import { InvalidDataKeyException } from './../../exception/InvalidDataKeyException.js';
import { Identificator } from './../../util/Indentificator.js';
export class ActivityModalController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._ACTIVITY_MODAL_MESSAGES_);
        this._activityModel = new ActivityModel();
        this._trackModel = new TrackModel();
        this._getPageMessages();
        this._initListeners();
    }
    _getPageMessages() {
        let messageData = this._messageModel.all();
        messageData.then(data => {
            data['pt-BR'].forEach(message => {
                Object.keys(message).forEach(key => {
                    MessageBuilder.buildMessage(ActivityModalElements.ELEMENTS.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                });
            });
        })
            .catch(error => Logger.log(error));
    }
    create() {
        //@ts-ignore
        $('#activityModal').modal('show');
        //this._clearInputs();
        this._populateSpeakerList();
        //this._populateTrackList();
        ActivityModalElements.ELEMENTS.get('activity_modal_button_update').classList.add('d-none');
        ActivityModalElements.ELEMENTS.get('activity_modal_button_create').classList.remove('d-none');
    }
    _populateTrackList() {
        let trackModel = new TrackModel();
        trackModel.all().then(data => {
            let fragment = document.createDocumentFragment();
            let optionElement;
            data.forEach(speaker => {
                optionElement = document.createElement('OPTION');
                optionElement.setAttribute('value', speaker['id']);
                optionElement.textContent = speaker['name'];
                fragment.appendChild(optionElement);
            });
            optionElement = document.createElement('OPTION');
            optionElement.setAttribute('value', '');
            optionElement.textContent = 'Nenhuma';
            fragment.appendChild(optionElement);
            ActivityModalElements.ELEMENTS.get('activity_modal_data_responsible').appendChild(fragment);
        })
            .catch(error => Logger.log('Activity Modal Controller: ' + error));
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
            ActivityModalElements.ELEMENTS.get('activity_modal_data_responsible').appendChild(fragment);
        })
            .catch(error => Logger.log('Activity Modal Controller: ' + error));
    }
    _clearInputs() {
        ActivityModalElements.ELEMENTS.forEach(element => {
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
        $('#activityModal').modal('show');
        //this._clearInputs();
        let activityModel = new ActivityModel();
        let targetActivity = activityModel.find('id', id);
        targetActivity.then(data => this._populateActivity(data));
        ActivityModalElements.ELEMENTS.get('activity_modal_button_update').classList.remove('d-none');
        ActivityModalElements.ELEMENTS.get('activity_modal_button_create').classList.add('d-none');
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
        ActivityModalElements.ELEMENTS.get('activity_modal_button_create').addEventListener('click', event => {
            document.querySelector('#activityModal').addEventListener('DOMAttrModified', event => {
                //@ts-ignore
                if (document.querySelector('#activityModal').style.display === 'none') {
                    Updater.updateData();
                }
            });
            try {
                this._activityModel.imageUpload(new FormData(ActivityModalElements.ELEMENTS.get('dataForm')))
                    .then(response => {
                    this._activityModel.insert({
                        "id": ((ActivityModalElements.ELEMENTS.get('activity_modal_data_id').value === '') || (!ActivityModalElements.ELEMENTS.get('activity_modal_data_id').value)) ? Identificator.generateID() : ActivityModalElements.ELEMENTS.get('activity_modal_data_id').value,
                        "title": ActivityModalElements.ELEMENTS.get('activity_modal_data_title').value,
                        "responsible_id": ActivityModalElements.ELEMENTS.get('activity_modal_data_responsible').value,
                        "avatar": ((response['data_name'] === '') || (!response['data_name'])) ? "default-avatar.png" : response['data_name'],
                        "description": ActivityModalElements.ELEMENTS.get('activity_modal_data_description').value,
                        "start_date": ActivityModalElements.ELEMENTS.get('activity_modal_data_startDate').value,
                        "start_time": ActivityModalElements.ELEMENTS.get('activity_modal_data_startTime').value,
                        "end_date": ActivityModalElements.ELEMENTS.get('activity_modal_data_endDate').value,
                        "end_time": ActivityModalElements.ELEMENTS.get('activity_modal_data_endTime').value,
                        "vacancies": ActivityModalElements.ELEMENTS.get('activity_modal_data_vacancies').value,
                        "restriction": ActivityModalElements.ELEMENTS.get('activity_modal_data_restriction').value,
                        "track_id": ActivityModalElements.ELEMENTS.get('activity_modal_data_track').value,
                        "offering": ActivityModalElements.ELEMENTS.get('activity_modal_data_offering').value,
                        "location": ActivityModalElements.ELEMENTS.get('activity_modal_data_location').value,
                        //"geo-location":     (ActivityModalElements.ELEMENTS.get('activity_modal_data_title') as HTMLInputElement).value,
                        "price": ActivityModalElements.ELEMENTS.get('activity_modal_data_price').value,
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
            $('#activityModal').modal('hide');
        }, false);
    }
    _initUpdateButtonListener() {
        ActivityModalElements.ELEMENTS.get('activity_modal_button_update').addEventListener('click', event => {
            document.querySelector('#activityModal').addEventListener('DOMAttrModified', event => {
                //@ts-ignore
                if (document.querySelector('#activityModal').style.display === 'none') {
                    Updater.updateData();
                }
            });
            this._activityModel.update({
                "title": ActivityModalElements.ELEMENTS.get('activity_modal_data_title').value,
                "responsible_id": ActivityModalElements.ELEMENTS.get('activity_modal_data_responsible').value,
                //"avatar":           ((response['data_name'] === '') || (!response['data_name'])) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                "description": ActivityModalElements.ELEMENTS.get('activity_modal_data_description').value,
                "start_date": ActivityModalElements.ELEMENTS.get('activity_modal_data_startDate').value,
                "start_time": ActivityModalElements.ELEMENTS.get('activity_modal_data_startTime').value,
                "end_date": ActivityModalElements.ELEMENTS.get('activity_modal_data_endDate').value,
                "end_time": ActivityModalElements.ELEMENTS.get('activity_modal_data_endTime').value,
                "vacancies": ActivityModalElements.ELEMENTS.get('activity_modal_data_vacancies').value,
                "restriction": ActivityModalElements.ELEMENTS.get('activity_modal_data_restriction').value,
                "track_id": ActivityModalElements.ELEMENTS.get('activity_modal_data_track').value,
                "offering": ActivityModalElements.ELEMENTS.get('activity_modal_data_offering').value,
                "location": ActivityModalElements.ELEMENTS.get('activity_modal_data_location').value,
                //"geo-location":     (ActivityModalElements.ELEMENTS.get('activity_modal_data_title') as HTMLInputElement).value,
                "price": ActivityModalElements.ELEMENTS.get('activity_modal_data_price').value,
                "show": true
            }, {
                "id": ActivityModalElements.ELEMENTS.get('activity_modal_data_id').value
            });
            //@ts-ignore
            $('#activityModal').modal('hide');
        }, false);
    }
    _populateActivity(activity) {
        ActivityModalElements.ELEMENTS.get('activity_modal_data_title').value = activity['title'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_id').value = activity['id'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_responsible').value = activity['responsible_id'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_description').value = activity['description'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_startDate').value = activity['start_date'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_startTime').value = activity['start_time'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_endDate').value = activity['end_date'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_endTime').value = activity['end_time'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_vacancies').value = activity['vacancies'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_restriction').value = activity['restriction'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_track').value = activity['track_id'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_offering').value = activity['offering'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_location').value = activity['location'];
        //(this._elements.get('activity_register_data_track')       as HTMLSelectElement).value     = activity['geo-location'];
        ActivityModalElements.ELEMENTS.get('activity_modal_data_price').value = activity['price'];
    }
}
//# sourceMappingURL=ActivityModalController.js.map