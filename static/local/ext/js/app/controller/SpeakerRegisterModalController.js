import { Controller } from './../../core/Controller.js';
import { MessageModel } from './../model/MessageModel.js';
import { SpeakerModel } from './../model/SpeakerModel.js';
import { DataEntity } from './../../conf/Config.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { Logger } from './../../util/Logger.js';
import { InvalidDataKeyException } from './../../exception/InvalidDataKeyException.js';
import { Identificator } from './../../util/Indentificator.js';
import { Updater } from './../../util/Updater.js';
import { SpeakerRegisterModalElements } from './../elements/SpeakerRegisterModalElements.js';
export class SpeakerRegisterModalController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._SPEAKER_REGISTER_MODAL_MESSAGES_);
        this._speakerModel = new SpeakerModel();
        this._elements = SpeakerRegisterModalElements.ELEMENTS;
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
    _initListeners() {
        this._elements.get('speaker_register_button_create').addEventListener('click', event => {
            document.querySelector('#speakerRegisterModal').addEventListener('DOMAttrModified', event => {
                //@ts-ignore
                if (document.querySelector('#speakerRegisterModal').style.display === 'none') {
                    Updater.updateData();
                }
            });
            try {
                this._speakerModel.imageUpload(new FormData(this._elements['dataForm']))
                    .then(response => {
                    this._speakerModel.insert({
                        "id": this._elements.get('speaker_register_data_id').value === "" || !(this._elements.get('speaker_register_data_id').value) ? Identificator.generateID() : this._elements.get('speaker_register_data_id').value,
                        "name": this._elements.get('speaker_register_data_name').value,
                        "jobInstitute": this._elements.get('speaker_register_data_jobInstitute').value,
                        "description": this._elements.get('speaker_register_data_description').value,
                        "email": this._elements.get('speaker_register_data_email').value,
                        "social-networks": {
                            "facebook": this._elements.get('speaker_register_data_socialNetworks-facebook').value,
                            "twitter": this._elements.get('speaker_register_data_socialNetworks-twitter').value,
                            "linkedin": this._elements.get('speaker_register_data_socialNetworks-linkedin').value,
                            "spotify": this._elements.get('speaker_register_data_socialNetworks-spotify').value,
                            "youtube": this._elements.get('speaker_register_data_socialNetworks-youtube').value,
                            "behance": this._elements.get('speaker_register_data_socialNetworks-behance').value,
                            "lattes": this._elements.get('speaker_register_data_socialNetworks-lattes').value,
                            "pinterest": this._elements.get('speaker_register_data_socialNetworks-pinterest').value,
                            "blog": this._elements.get('speaker_register_data_socialNetworks-blog').value,
                        },
                        "avatar": ((!response['data_name']) || (response['data_name'] === "")) ? "/local/img/structure/default-avatar.png" : response['data_name'],
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
            $('#speakerRegisterModal').modal('hide');
        }, false);
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
        $('#speakerRegisterModal').modal('show');
        this._clearInputs();
        this._elements.get('speaker_register_button_update').classList.add('d-none');
        this._elements.get('speaker_register_button_create').classList.remove('d-none');
    }
    _clearInputs() {
        this._elements.forEach(element => {
            if (element.nodeName === 'INPUT') {
                element.nodeValue = "";
            }
        });
    }
    _initInputDescriptionListeners() {
        this._elements.get('speaker_register_data_description').addEventListener('focus', event => {
            if (event.target.value.length === 0) {
                this._elements.get('speaker_register_label_helper-description').textContent = "Você pode digitar 35 letras.";
            }
        });
        this._elements.get('speaker_register_data_description').addEventListener('blur', event => {
            if (event.target.value.length === 0) {
                this._elements.get('speaker_register_label_helper-description').textContent = "";
            }
        });
        this._elements.get('speaker_register_data_description').addEventListener('keypress', event => {
            let size = event.target.value.length;
            if (event.target.focus) {
                this._elements.get('speaker_register_label_helper-description').textContent = "Você pode digitar mais " + (90 - size) + " caracteres.";
            }
            else {
                this._elements.get('speaker_register_label_helper-description').textContent = "";
            }
        });
    }
    _initInputJobInstituteListeners() {
        this._elements.get('speaker_register_data_jobInstitute').addEventListener('focus', event => {
            if (event.target.value.length === 0) {
                this._elements.get('speaker_register_label_helper-jobInstitute').textContent = "Você pode digitar 35 caracteres.";
            }
        });
        this._elements.get('speaker_register_data_jobInstitute').addEventListener('blur', event => {
            if (event.target.value.length === 0) {
                this._elements.get('speaker_register_label_helper-jobInstitute').textContent = "";
            }
        });
        this._elements.get('speaker_register_data_jobInstitute').addEventListener('keypress', event => {
            let size = event.target.value.length;
            if (event.target.focus) {
                this._elements.get('speaker_register_label_helper-jobInstitute').textContent = "Você pode digitar mais " + (50 - size) + " letras.";
            }
            else {
                this._elements.get('speaker_register_label_helper-jobInstitute').textContent = "";
            }
        });
    }
    _initInputNameListeners() {
        this._elements.get('speaker_register_data_name').addEventListener('focus', event => {
            if (event.target.value.length === 0) {
                this._elements.get('speaker_register_label_helper-name').textContent = "Você pode digitar 35 letras.";
            }
        });
        this._elements.get('speaker_register_data_name').addEventListener('blur', event => {
            if (event.target.value.length === 0) {
                this._elements.get('speaker_register_label_helper-name').textContent = "";
            }
        });
        this._elements.get('speaker_register_data_name').addEventListener('keypress', event => {
            let size = event.target.value.length;
            if (event.target.focus) {
                this._elements.get('speaker_register_label_helper-name').textContent = "Você pode digitar mais " + (35 - size) + " letras.";
            }
            else {
                this._elements.get('speaker_register_label_helper-name').textContent = "";
            }
        });
    }
    update(id) {
        //@ts-ignore
        $('#speakerRegisterModal').modal('show');
        this._elements.get('speaker_register_button_update').classList.remove('d-none');
        this._elements.get('speaker_register_button_create').classList.add('d-none');
        let speaker = this._speakerModel.find('id', id);
        speaker.then(data => {
            this._populateInformations(data);
            this._elements['speaker_register_button_update'].addEventListener('click', event => {
                document.querySelector('#speakerRegisterModal').addEventListener('DOMAttrModified', event => {
                    //@ts-ignore
                    if (document.querySelector('#speakerRegisterModal').style.display === 'none') {
                        Updater.updateData();
                    }
                });
                try {
                    this._speakerModel.update({
                        "id": this._elements.get('speaker_register_data_id').value,
                        "name": this._elements.get('speaker_register_data_name').value,
                        "jobInstitute": this._elements.get('speaker_register_data_jobInstitute').value,
                        "description": this._elements.get('speaker_register_data_description').value,
                        "email": this._elements.get('speaker_register_data_email').value,
                        "social-networks": {
                            "facebook": this._elements.get('speaker_register_data_socialNetworks-facebook').value,
                            "twitter": this._elements.get('speaker_register_data_socialNetworks-twitter').value,
                            "linkedin": this._elements.get('speaker_register_data_socialNetworks-linkedin').value,
                            "spotify": this._elements.get('speaker_register_data_socialNetworks-spotify').value,
                            "youtube": this._elements.get('speaker_register_data_socialNetworks-youtube').value,
                            "behance": this._elements.get('speaker_register_data_socialNetworks-behance').value,
                            "lattes": this._elements.get('speaker_register_data_socialNetworks-lattes').value,
                            "pinterest": this._elements.get('speaker_register_data_socialNetworks-pinterest').value,
                            "blog": this._elements.get('speaker_register_data_socialNetworks-blog').value,
                        },
                        //"avatar":   ((!response['data_name']) || (response['data_name'] === "")) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                        "show": true
                    }, {
                        "id": this._elements.get('speaker_register_data_id').value
                    });
                }
                catch (exception) {
                    if (exception instanceof InvalidDataKeyException) {
                        Logger.log("Update Exception: " + exception.message);
                    }
                }
                //@ts-ignore
                $('#speakerRegisterModal').modal('hide');
            });
        });
    }
    _populateInformations(speaker) {
        this._elements.get('speaker_register_data_name').value = speaker['name'];
        this._elements.get('speaker_register_data_jobInstitute').value = speaker['jobInstitute'];
        //(this._elements.get('speaker_register_data_avatar')                     as HTMLInputElement).value      = speaker['avatar'];
        this._elements.get('speaker_register_data_id').value = speaker['id'];
        this._elements.get('speaker_register_data_description').value = speaker['description'];
        this._elements.get('speaker_register_data_email').value = speaker['email'];
        this._elements.get('speaker_register_data_socialNetworks-facebook').value = speaker['social-networks']['facebook'];
        this._elements.get('speaker_register_data_socialNetworks-youtube').value = speaker['social-networks']['youtube'];
        this._elements.get('speaker_register_data_socialNetworks-pinterest').value = speaker['social-networks']['pinterest'];
        this._elements.get('speaker_register_data_socialNetworks-twitter').value = speaker['social-networks']['twitter'];
        this._elements.get('speaker_register_data_socialNetworks-lattes').value = speaker['social-networks']['lattes'];
        this._elements.get('speaker_register_data_socialNetworks-github').value = speaker['social-networks']['github'];
        this._elements.get('speaker_register_data_socialNetworks-spotify').value = speaker['social-networks']['spotify'];
        this._elements.get('speaker_register_data_socialNetworks-linkedin').value = speaker['social-networks']['linkedin'];
        this._elements.get('speaker_register_data_socialNetworks-behance').value = speaker['social-networks']['behance'];
        this._elements.get('speaker_register_data_socialNetworks-blog').value = speaker['social-networks']['blog'];
    }
}
//# sourceMappingURL=SpeakerRegisterModalController.js.map