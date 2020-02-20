import { Controller } from './../../core/Controller.js';
import { MessageModel } from './../model/MessageModel.js';
import { SpeakerModel } from './../model/SpeakerModel.js';
import { DataEntity } from './../../conf/Config.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { Logger } from './../../util/Logger.js';
import { InvalidDataKeyException } from './../../exception/InvalidDataKeyException.js';
import { Identificator } from './../../util/Indentificator.js';
import { Updater } from './../../util/Updater.js';
export class SpeakerRegisterModalController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._SPEAKER_REGISTER_MODAL_MESSAGES_);
        this._speakerModel = new SpeakerModel();
        this._initElements();
        this._getPageMessages();
        this._initListeners();
    }
    _initElements() {
        this._elements = new Array();
        this._elements['speaker_register_label_title'] = document.querySelector('#speaker_register_label_title');
        this._elements['speaker_register_data_id'] = document.querySelector('#speaker_register_data_id');
        this._elements['speaker_register_label_name'] = document.querySelector('#speaker_register_label_name');
        this._elements['speaker_register_data_name'] = document.querySelector('#speaker_register_data_name');
        this._elements['speaker_register_label_jobInstitute'] = document.querySelector('#speaker_register_label_jobInstitute');
        this._elements['speaker_register_data_jobInstitute'] = document.querySelector('#speaker_register_data_jobInstitute');
        this._elements['speaker_register_label_description'] = document.querySelector('#speaker_register_label_description');
        this._elements['speaker_register_data_description'] = document.querySelector('#speaker_register_data_description');
        this._elements['speaker_register_label_socialNetworks'] = document.querySelector('#speaker_register_label_socialNetworks');
        this._elements['speaker_register_label_socialNetworks-facebook'] = document.querySelector('#speaker_register_label_socialNetworks-facebook');
        this._elements['speaker_register_label_socialNetworks-twitter'] = document.querySelector('#speaker_register_label_socialNetworks-twitter');
        this._elements['speaker_register_label_socialNetworks-lattes'] = document.querySelector('#speaker_register_label_socialNetworks-lattes');
        this._elements['speaker_register_label_socialNetworks-github'] = document.querySelector('#speaker_register_label_socialNetworks-github');
        this._elements['speaker_register_label_socialNetworks-youtube'] = document.querySelector('#speaker_register_label_socialNetworks-youtube');
        this._elements['speaker_register_label_socialNetworks-spotify'] = document.querySelector('#speaker_register_label_socialNetworks-spotify');
        this._elements['speaker_register_label_socialNetworks-behance'] = document.querySelector('#speaker_register_label_socialNetworks-behance');
        this._elements['speaker_register_label_socialNetworks-skype'] = document.querySelector('#speaker_register_label_socialNetworks-skype');
        this._elements['speaker_register_label_socialNetworks-linkedin'] = document.querySelector('#speaker_register_label_socialNetworks-linkedin');
        this._elements['speaker_register_label_socialNetworks-pinterest'] = document.querySelector('#speaker_register_label_socialNetworks-pinterest');
        this._elements['speaker_register_label_socialNetworks-blog'] = document.querySelector('#speaker_register_label_socialNetworks-blog');
        this._elements['speaker_register_data_socialNetworks'] = document.querySelector('#speaker_register_data_socialNetworks');
        this._elements['speaker_register_data_socialNetworks-facebook'] = document.querySelector('#speaker_register_data_socialNetworks-facebook');
        this._elements['speaker_register_data_socialNetworks-twitter'] = document.querySelector('#speaker_register_data_socialNetworks-twitter');
        this._elements['speaker_register_data_socialNetworks-lattes'] = document.querySelector('#speaker_register_data_socialNetworks-lattes');
        this._elements['speaker_register_data_socialNetworks-github'] = document.querySelector('#speaker_register_data_socialNetworks-github');
        this._elements['speaker_register_data_socialNetworks-youtube'] = document.querySelector('#speaker_register_data_socialNetworks-youtube');
        this._elements['speaker_register_data_socialNetworks-spotify'] = document.querySelector('#speaker_register_data_socialNetworks-spotify');
        this._elements['speaker_register_data_socialNetworks-behance'] = document.querySelector('#speaker_register_data_socialNetworks-behance');
        this._elements['speaker_register_data_socialNetworks-skype'] = document.querySelector('#speaker_register_data_socialNetworks-skype');
        this._elements['speaker_register_data_socialNetworks-linkedin'] = document.querySelector('#speaker_register_data_socialNetworks-linkedin');
        this._elements['speaker_register_data_socialNetworks-pinterest'] = document.querySelector('#speaker_register_data_socialNetworks-pinterest');
        this._elements['speaker_register_data_socialNetworks-blog'] = document.querySelector('#speaker_register_data_socialNetworks-blog');
        this._elements['speaker_register_label_email'] = document.querySelector('#speaker_register_label_email');
        this._elements['speaker_register_data_email'] = document.querySelector('#speaker_register_data_email');
        this._elements['speaker_register_label_avatar'] = document.querySelector('#speaker_register_label_avatar');
        this._elements['speaker_register_data_avatar'] = document.querySelector('#speaker_register_data_avatar');
        this._elements['speaker_register_label_avatar2'] = document.querySelector('#speaker_register_label_avatar2');
        this._elements['speaker_register_button_create'] = document.querySelector('#speaker_register_button_create');
        this._elements['speaker_register_button_update'] = document.querySelector('#speaker_register_button_update');
        this._elements['speaker_register_label_helper-name'] = document.querySelector('#speaker_register_label_helper-name');
        this._elements['speaker_register_label_helper-jobInstitute'] = document.querySelector('#speaker_register_label_helper-jobInstitute');
        this._elements['speaker_register_label_helper-description'] = document.querySelector('#speaker_register_label_helper-description');
        this._elements['dataForm'] = document.querySelector('#dataForm');
    }
    _getPageMessages() {
        this._messageData = this._messageModel.all();
        this._messageData.then(data => {
            let elementKey;
            data['pt-BR'].forEach(message => {
                Object.keys(message).forEach(key => {
                    MessageBuilder.buildMessage(this._elements[(message['id']) ? message['id'] : (message['tag'])], key, message[key]);
                });
            });
        })
            .catch(error => Logger.log(error));
    }
    _initListeners() {
        this._elements['speaker_register_button_create'].addEventListener('click', event => {
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
                        "id": (this._elements['speaker_register_data_id'].value === "" || !this._elements['speaker_register_data_id'].value) ? Identificator.generateID() : this._elements['speaker_register_data_id'].value,
                        "name": this._elements['speaker_register_data_name'].value,
                        "jobInstitute": this._elements['speaker_register_data_jobInstitute'].value,
                        "description": this._elements['speaker_register_data_description'].value,
                        "email": this._elements['speaker_register_data_email'].value,
                        "social-networks": {
                            "facebook": this._elements['speaker_register_data_socialNetworks-facebook'].value,
                            "twitter": this._elements['speaker_register_data_socialNetworks-twitter'].value,
                            "linkedin": this._elements['speaker_register_data_socialNetworks-linkedin'].value,
                            "spotify": this._elements['speaker_register_data_socialNetworks-spotify'].value,
                            "youtube": this._elements['speaker_register_data_socialNetworks-youtube'].value,
                            "behance": this._elements['speaker_register_data_socialNetworks-behance'].value,
                            "lattes": this._elements['speaker_register_data_socialNetworks-lattes'].value,
                            "pinterest": this._elements['speaker_register_data_socialNetworks-pinterest'].value,
                            "blog": this._elements['speaker_register_data_socialNetworks-blog'].value,
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
        this._elements['speaker_register_button_update'].classList.add('d-none');
        this._elements['speaker_register_button_create'].classList.remove('d-none');
    }
    _clearInputs() {
        this._elements.forEach(element => {
            if (element.nodeName === 'INPUT') {
                element.nodeValue = "";
            }
        });
    }
    _initInputDescriptionListeners() {
        this._elements['speaker_register_data_description'].addEventListener('focus', event => {
            if (event.target.value.length === 0) {
                this._elements['speaker_register_label_helper-description'].textContent = "Você pode digitar 35 letras.";
            }
        });
        this._elements['speaker_register_data_description'].addEventListener('blur', event => {
            if (event.target.value.length === 0) {
                this._elements['speaker_register_label_helper-description'].textContent = "";
            }
        });
        this._elements['speaker_register_data_description'].addEventListener('keypress', event => {
            let size = event.target.value.length;
            if (event.target.focus) {
                this._elements['speaker_register_label_helper-description'].textContent = "Você pode digitar mais " + (90 - size) + " caracteres.";
            }
            else {
                this._elements['speaker_register_label_helper-description'].textContent = "";
            }
        });
    }
    _initInputJobInstituteListeners() {
        this._elements['speaker_register_data_jobInstitute'].addEventListener('focus', event => {
            if (event.target.value.length === 0) {
                this._elements['speaker_register_label_helper-jobInstitute'].textContent = "Você pode digitar 35 caracteres.";
            }
        });
        this._elements['speaker_register_data_jobInstitute'].addEventListener('blur', event => {
            if (event.target.value.length === 0) {
                this._elements['speaker_register_label_helper-jobInstitute'].textContent = "";
            }
        });
        this._elements['speaker_register_data_jobInstitute'].addEventListener('keypress', event => {
            let size = event.target.value.length;
            if (event.target.focus) {
                this._elements['speaker_register_label_helper-jobInstitute'].textContent = "Você pode digitar mais " + (50 - size) + " letras.";
            }
            else {
                this._elements['speaker_register_label_helper-jobInstitute'].textContent = "";
            }
        });
    }
    _initInputNameListeners() {
        this._elements['speaker_register_data_name'].addEventListener('focus', event => {
            if (event.target.value.length === 0) {
                this._elements['speaker_register_label_helper-name'].textContent = "Você pode digitar 35 letras.";
            }
        });
        this._elements['speaker_register_data_name'].addEventListener('blur', event => {
            if (event.target.value.length === 0) {
                this._elements['speaker_register_label_helper-name'].textContent = "";
            }
        });
        this._elements['speaker_register_data_name'].addEventListener('keypress', event => {
            let size = event.target.value.length;
            if (event.target.focus) {
                this._elements['speaker_register_label_helper-name'].textContent = "Você pode digitar mais " + (35 - size) + " letras.";
            }
            else {
                this._elements['speaker_register_label_helper-name'].textContent = "";
            }
        });
    }
    update(id) {
        //@ts-ignore
        $('#speakerRegisterModal').modal('show');
        this._elements['speaker_register_button_update'].classList.remove('d-none');
        this._elements['speaker_register_button_create'].classList.add('d-none');
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
                        "id": this._elements['speaker_register_data_id'].value,
                        "name": this._elements['speaker_register_data_name'].value,
                        "jobInstitute": this._elements['speaker_register_data_jobInstitute'].value,
                        "description": this._elements['speaker_register_data_description'].value,
                        "email": this._elements['speaker_register_data_email'].value,
                        "social-networks": {
                            "facebook": this._elements['speaker_register_data_socialNetworks-facebook'].value,
                            "twitter": this._elements['speaker_register_data_socialNetworks-twitter'].value,
                            "linkedin": this._elements['speaker_register_data_socialNetworks-linkedin'].value,
                            "spotify": this._elements['speaker_register_data_socialNetworks-spotify'].value,
                            "youtube": this._elements['speaker_register_data_socialNetworks-youtube'].value,
                            "behance": this._elements['speaker_register_data_socialNetworks-behance'].value,
                            "lattes": this._elements['speaker_register_data_socialNetworks-lattes'].value,
                            "pinterest": this._elements['speaker_register_data_socialNetworks-pinterest'].value,
                            "blog": this._elements['speaker_register_data_socialNetworks-blog'].value,
                        },
                        //"avatar":   ((!response['data_name']) || (response['data_name'] === "")) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                        "show": true
                    }, {
                        "id": this._elements['speaker_register_data_id'].value
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
        this._elements['speaker_register_data_name'].value = speaker['name'];
        this._elements['speaker_register_data_jobInstitute'].value = speaker['jobInstitute'];
        //this._elements['speaker_register_data_avatar'].value                    = speaker['avatar'];
        this._elements['speaker_register_data_id'].value = speaker['id'];
        this._elements['speaker_register_data_description'].value = speaker['description'];
        this._elements['speaker_register_data_email'].value = speaker['email'];
        this._elements['speaker_register_data_socialNetworks-facebook'].value = speaker['social-networks']['facebook'];
        this._elements['speaker_register_data_socialNetworks-youtube'].value = speaker['social-networks']['youtube'];
        this._elements['speaker_register_data_socialNetworks-pinterest'].value = speaker['social-networks']['pinterest'];
        this._elements['speaker_register_data_socialNetworks-twitter'].value = speaker['social-networks']['twitter'];
        this._elements['speaker_register_data_socialNetworks-lattes'].value = speaker['social-networks']['lattes'];
        this._elements['speaker_register_data_socialNetworks-github'].value = speaker['social-networks']['github'];
        this._elements['speaker_register_data_socialNetworks-spotify'].value = speaker['social-networks']['spotify'];
        this._elements['speaker_register_data_socialNetworks-linkedin'].value = speaker['social-networks']['linkedin'];
        this._elements['speaker_register_data_socialNetworks-behance'].value = speaker['social-networks']['behance'];
        this._elements['speaker_register_data_socialNetworks-blog'].value = speaker['social-networks']['blog'];
    }
}
//# sourceMappingURL=SpeakerRegisterModalController.js.map