import { Controller } from './../../core/Controller.js';
import { MessageModel } from './../model/MessageModel.js';
import { SpeakerModel } from './../model/SpeakerModel.js';
import { DataEntity } from './../../conf/Config.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { Logger } from './../../util/Logger.js';
import { InvalidDataKeyException } from './../../exception/InvalidDataKeyException.js';
import { Identificator } from './../../util/Indentificator.js';
import { Updater } from './../../util/Updater.js';
import { SpeakerModalElements } from './../elements/SpeakerModalElements.js';
export class SpeakerModalController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._SPEAKER_MODAL_MESSAGES_);
        this._speakerModel = new SpeakerModel();
        this._getPageMessages();
        this._initListeners();
    }
    _getPageMessages() {
        this._messageData = this._messageModel.all();
        this._messageData.then(data => {
            data['pt-BR'].forEach(message => {
                Object.keys(message).forEach(key => {
                    MessageBuilder.buildMessage(SpeakerModalElements.ELEMENTS.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                });
            });
        })
            .catch(error => Logger.log(error));
    }
    _initListeners() {
        SpeakerModalElements.ELEMENTS.get('speaker_modal_button_create').addEventListener('click', event => {
            document.querySelector('#speakerModal').addEventListener('DOMAttrModified', event => {
                //@ts-ignore
                if (document.querySelector('#speakerModal').style.display === 'none') {
                    Updater.updateData();
                }
            });
            try {
                this._speakerModel.imageUpload(new FormData(SpeakerModalElements.ELEMENTS.get('speaker_modal_dataForm')))
                    .then(response => {
                    this._speakerModel.insert({
                        "id": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id').value === "" || !(SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id').value) ? Identificator.generateID() : SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id').value,
                        "name": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name').value,
                        "jobInstitute": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute').value,
                        "description": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description').value,
                        "email": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_email').value,
                        "social-networks": {
                            "facebook": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-facebook').value,
                            "twitter": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-twitter').value,
                            "linkedin": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-linkedin').value,
                            "spotify": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-spotify').value,
                            "youtube": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-youtube').value,
                            "behance": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-behance').value,
                            "lattes": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-lattes').value,
                            "pinterest": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-pinterest').value,
                            "blog": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-blog').value,
                        },
                        "avatar": ((!response['data_name']) || (response['data_name'] === "")) ? "default-avatar.svg" : response['data_name'],
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
            $('#speakerModal').modal('hide');
        }, false);
        SpeakerModalElements.ELEMENTS.get('speaker_modal_button_update').addEventListener('click', event => {
            document.querySelector('#speakerModal').addEventListener('DOMAttrModified', event => {
                //@ts-ignore
                if (document.querySelector('#speakerModal').style.display === 'none') {
                    Updater.updateData();
                }
            });
            try {
                this._speakerModel.update({
                    "id": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id').value,
                    "name": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name').value,
                    "jobInstitute": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute').value,
                    "description": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description').value,
                    "email": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_email').value,
                    "social-networks": {
                        "facebook": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-facebook').value,
                        "twitter": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-twitter').value,
                        "linkedin": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-linkedin').value,
                        "spotify": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-spotify').value,
                        "youtube": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-youtube').value,
                        "behance": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-behance').value,
                        "lattes": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-lattes').value,
                        "pinterest": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-pinterest').value,
                        "blog": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-blog').value,
                    },
                    //"avatar":   ((!response['data_name']) || (response['data_name'] === "")) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                    "show": true
                }, {
                    "id": SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id').value
                });
            }
            catch (exception) {
                if (exception instanceof InvalidDataKeyException) {
                    Logger.log("Update Exception: " + exception.message);
                }
            }
            //@ts-ignore
            $('#speakerModal').modal('hide');
        });
        this._initInputNameListeners();
        this._initInputJobInstituteListeners();
        this._initInputDescriptionListeners();
    }
    delete(id) {
        this._speakerModel.delete('id', id);
        Updater.updateData();
    }
    create() {
        //@ts-ignore
        $('#speakerModal').modal('show');
        this._clearInputs();
        SpeakerModalElements.ELEMENTS.get('speaker_modal_button_update').classList.add('d-none');
        SpeakerModalElements.ELEMENTS.get('speaker_modal_button_create').classList.remove('d-none');
    }
    _clearInputs() {
        SpeakerModalElements.ELEMENTS.forEach(element => {
            if (element.nodeName === 'INPUT') {
                element.nodeValue = "";
            }
        });
    }
    _initInputDescriptionListeners() {
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description').addEventListener('focus', event => {
            if (event.target.value.length === 0) {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-description').textContent = "Você pode digitar 35 letras.";
            }
        });
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description').addEventListener('blur', event => {
            if (event.target.value.length === 0) {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-description').textContent = "";
            }
        });
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description').addEventListener('keypress', event => {
            let size = event.target.value.length;
            if (event.target.focus) {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-description').textContent = "Você pode digitar mais " + (90 - size) + " caracteres.";
            }
            else {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-description').textContent = "";
            }
        });
    }
    _initInputJobInstituteListeners() {
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute').addEventListener('focus', event => {
            if (event.target.value.length === 0) {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-jobInstitute').textContent = "Você pode digitar 35 caracteres.";
            }
        });
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute').addEventListener('blur', event => {
            if (event.target.value.length === 0) {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-jobInstitute').textContent = "";
            }
        });
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute').addEventListener('keypress', event => {
            let size = event.target.value.length;
            if (event.target.focus) {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-jobInstitute').textContent = "Você pode digitar mais " + (50 - size) + " letras.";
            }
            else {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-jobInstitute').textContent = "";
            }
        });
    }
    _initInputNameListeners() {
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name').addEventListener('focus', event => {
            if (event.target.value.length === 0) {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-name').textContent = "Você pode digitar 35 letras.";
            }
        });
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name').addEventListener('blur', event => {
            if (event.target.value.length === 0) {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-name').textContent = "";
            }
        });
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name').addEventListener('keypress', event => {
            let size = event.target.value.length;
            if (event.target.focus) {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-name').textContent = "Você pode digitar mais " + (35 - size) + " letras.";
            }
            else {
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-name').textContent = "";
            }
        });
    }
    update(id) {
        //@ts-ignore
        $('#speakerModal').modal('show');
        let speaker = this._speakerModel.find('id', id);
        speaker.then(data => this._populateInformations(data));
        SpeakerModalElements.ELEMENTS.get('speaker_modal_button_update').classList.remove('d-none');
        SpeakerModalElements.ELEMENTS.get('speaker_modal_button_create').classList.add('d-none');
    }
    _populateInformations(speaker) {
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name').value = speaker['name'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute').value = speaker['jobInstitute'];
        //(this._elements.get('speaker_register_data_avatar')                     as HTMLInputElement).value      = speaker['avatar'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id').value = speaker['id'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description').value = speaker['description'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_email').value = speaker['email'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-facebook').value = speaker['social-networks']['facebook'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-youtube').value = speaker['social-networks']['youtube'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-pinterest').value = speaker['social-networks']['pinterest'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-twitter').value = speaker['social-networks']['twitter'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-lattes').value = speaker['social-networks']['lattes'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-github').value = speaker['social-networks']['github'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-spotify').value = speaker['social-networks']['spotify'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-linkedin').value = speaker['social-networks']['linkedin'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-behance').value = speaker['social-networks']['behance'];
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-blog').value = speaker['social-networks']['blog'];
    }
}
//# sourceMappingURL=SpeakerModalController.js.map