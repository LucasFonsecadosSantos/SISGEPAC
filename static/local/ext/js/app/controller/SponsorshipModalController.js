import { Controller } from './../../core/Controller.js';
import { SponsorshipModel } from './../model/SponsorshipModel.js';
import { SponsorshipModalElements } from './../elements/SponsorshipModalElements.js';
import { MessageModel } from './../model/MessageModel.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { DataEntity } from './../../conf/Config.js';
import { Logger } from './../../util/Logger.js';
import { Updater } from './../../util/Updater.js';
import { InvalidDataKeyException } from './../../exception/InvalidDataKeyException.js';
import { Identificator } from './../../util/Indentificator.js';
export class SponsorshipModalController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._SPONSORSHIP_MODAL_MESSAGES_);
        this._sponsorshipModel = new SponsorshipModel();
        this._getPageMessages();
        this._initListeners();
    }
    _getPageMessages() {
        let messageData = this._messageModel.all();
        messageData.then(data => {
            data['pt-BR'].forEach(message => {
                Object.keys(message).forEach(key => {
                    MessageBuilder.buildMessage(SponsorshipModalElements.ELEMENTS.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                });
            });
        })
            .catch(error => Logger.log(error));
    }
    create() {
        //@ts-ignore
        $('#sponsorshipModal').modal('show');
        //this._clearInputs();
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_update').classList.add('d-none');
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_create').classList.remove('d-none');
    }
    _clearInputs() {
        SponsorshipModalElements.ELEMENTS.forEach(element => {
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
        $('#sponsorshipModal').modal('show');
        //this._clearInputs();
        let sponsorshipModel = new SponsorshipModel();
        let sponsorship = sponsorshipModel.find('id', id);
        sponsorship.then(data => this._populate(data));
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_update').classList.remove('d-none');
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_create').classList.add('d-none');
    }
    delete(id) {
        this._sponsorshipModel.delete('id', id);
        Updater.updateData();
    }
    _initListeners() {
        this._initCreateButtonListener();
        this._initUpdateButtonListener();
    }
    _initCreateButtonListener() {
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_create').addEventListener('click', event => {
            document.querySelector('#sponsorshipModal').addEventListener('DOMAttrModified', event => {
                //@ts-ignore
                if (document.querySelector('#sponsorshipModal').style.display === 'none') {
                    Updater.updateData();
                }
            });
            try {
                this._sponsorshipModel.imageUpload(new FormData(SponsorshipModalElements.ELEMENTS.get('dataForm')))
                    .then(response => {
                    this._sponsorshipModel.insert({
                        "id": ((SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_id').value === '') || (!SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_id').value)) ? Identificator.generateID() : SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_id').value,
                        "name": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_name').value,
                        "avatar": ((response['data_name'] === '') || (!response['data_name'])) ? "default-avatar.png" : response['data_name'],
                        "description": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_description').value,
                        "price": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_price').value,
                        "website": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_website').value,
                        "email": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_email').value,
                        "telephone": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_telephone').value,
                        "sponsorship_plan_id": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_sponsorship-plan-id').value,
                        "social-networks": {
                            "facebook": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-facebook').value,
                            "twitter": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-twitter').value,
                            "instagram": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-instagram').value,
                            "pinterest": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-pinterest').value,
                            "linkedin": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-linkedin').value,
                            "lattes": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-lattes').value,
                            "github": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-github').value,
                            "youtube": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-youtube').value
                        },
                        "visible": true
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
            $('#sponsorshipModal').modal('hide');
        }, false);
    }
    _initUpdateButtonListener() {
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_update').addEventListener('click', event => {
            document.querySelector('#sponsorshipModal').addEventListener('DOMAttrModified', event => {
                //@ts-ignore
                if (document.querySelector('#sponsorshipModal').style.display === 'none') {
                    Updater.updateData();
                }
            });
            this._sponsorshipModel.update({
                "name": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_name').value,
                //"avatar":           ((response['data_name'] === '') || (!response['data_name'])) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                "description": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_description').value,
                "price": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_price').value,
                "website": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_website').value,
                "email": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_email').value,
                "telephone": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_telephone').value,
                "sponsorship_plan_id": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_sponsorship-plan-id').value,
                "social-networks": {
                    "facebook": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-facebook').value,
                    "twitter": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-twitter').value,
                    "instagram": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-instagram').value,
                    "pinterest": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-pinterest').value,
                    "linkedin": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-linkedin').value,
                    "lattes": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-lattes').value,
                    "github": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-github').value,
                    "youtube": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-youtube').value
                },
                "visible": true
            }, {
                "id": SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_id').value
            });
            //@ts-ignore
            $('#sponsorshipModal').modal('hide');
        }, false);
    }
    _populate(sponsorship) {
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_name').value = sponsorship['name'];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_id').value = sponsorship['id'];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_price').value = sponsorship['price'];
        //((response['data_name'] === '') || (!response['data_name'])) ? "default-avatar.png" : response['data_name'],
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_description').value = sponsorship["description"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_website').value = sponsorship["website"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_email').value = sponsorship["email"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_telephone').value = sponsorship["telephone"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_sponsorship-plan-id').value = sponsorship["sponsorship_plan_id"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-facebook').value = sponsorship["social-networks"]["facebook"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-twitter').value = sponsorship["social-networks"]["twitter"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-instagram').value = sponsorship["social-networks"]["instagram"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-pinterest').value = sponsorship["social-networks"]["pinterest"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-linkedin').value = sponsorship["social-networks"]["linkedin"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-lattes').value = sponsorship["social-networks"]["lattes"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-github').value = sponsorship["social-networks"]["github"];
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-youtube').value = sponsorship["social-networks"]["youtube"];
    }
}
//# sourceMappingURL=SponsorshipModalController.js.map