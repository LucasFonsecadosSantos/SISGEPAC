import { Controller } from './../../core/Controller.js';
import { SponsorshipPlanModel } from './../model/SponsorshipPlanModel.js';
import { SponsorshipPlanModalElements } from './../elements/SponsorshipPlanModalElements.js';
import { MessageModel } from './../model/MessageModel.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { DataEntity } from './../../conf/Config.js';
import { Logger } from './../../util/Logger.js';
import { Updater } from './../../util/Updater.js';
import { InvalidDataKeyException } from './../../exception/InvalidDataKeyException.js';
import { Identificator } from './../../util/Indentificator.js';
export class SponsorshipPlanModalController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._SPONSORSHIP_PLAN_MODAL_MESSAGES_);
        this._sponsorshipPlanModel = new SponsorshipPlanModel();
        this._getPageMessages();
        this._initListeners();
    }
    _getPageMessages() {
        let messageData = this._messageModel.all();
        messageData.then(data => {
            data['pt-BR'].forEach(message => {
                Object.keys(message).forEach(key => {
                    MessageBuilder.buildMessage(SponsorshipPlanModalElements.ELEMENTS.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                });
            });
        })
            .catch(error => Logger.log(error));
    }
    create() {
        //@ts-ignore
        $('#sponsorshipPlanModal').modal('show');
        //this._clearInputs();
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_update').classList.add('d-none');
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_create').classList.remove('d-none');
    }
    _clearInputs() {
        SponsorshipPlanModalElements.ELEMENTS.forEach(element => {
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
        $('#sponsorshipPlanModal').modal('show');
        //this._clearInputs();
        let sponsorshipPlanModel = new SponsorshipPlanModel();
        let sponsorshipPlan = sponsorshipPlanModel.find('id', id);
        sponsorshipPlan.then(data => this._populate(data));
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_update').classList.remove('d-none');
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_create').classList.add('d-none');
    }
    delete(id) {
        this._sponsorshipPlanModel.delete('id', id);
        Updater.updateData();
    }
    _initListeners() {
        this._initCreateButtonListener();
        this._initUpdateButtonListener();
    }
    _initCreateButtonListener() {
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_create').addEventListener('click', event => {
            document.querySelector('#sponsorshipPlanModal').addEventListener('DOMAttrModified', event => {
                //@ts-ignore
                if (document.querySelector('#sponsorshipPlanModal').style.display === 'none') {
                    Updater.updateData();
                }
            });
            try {
                this._sponsorshipPlanModel.imageUpload(new FormData(SponsorshipPlanModalElements.ELEMENTS.get('dataForm')))
                    .then(response => {
                    this._sponsorshipPlanModel.insert({
                        "id": ((SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_id').value === '') || (!SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_id').value)) ? Identificator.generateID() : SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_id').value,
                        "name": SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_name').value,
                        "avatar": ((response['data_name'] === '') || (!response['data_name'])) ? "default-avatar.png" : response['data_name'],
                        "description": SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_description').value,
                        "price": SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_price').value
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
            $('#sponsorshipPlanModal').modal('hide');
        }, false);
    }
    _initUpdateButtonListener() {
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_update').addEventListener('click', event => {
            document.querySelector('#sponsorshipPlanModal').addEventListener('DOMAttrModified', event => {
                //@ts-ignore
                if (document.querySelector('#sponsorshipPlanModal').style.display === 'none') {
                    Updater.updateData();
                }
            });
            this._sponsorshipPlanModel.update({
                "name": SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_name').value,
                //"avatar":           ((response['data_name'] === '') || (!response['data_name'])) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                "description": SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_description').value,
                "price": SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_price').value,
            }, {
                "id": SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_id').value
            });
            //@ts-ignore
            $('#sponsorshipPlanModal').modal('hide');
        }, false);
    }
    _populate(sponsorshipPlan) {
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_name').value = sponsorshipPlan['name'];
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_id').value = sponsorshipPlan['id'];
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_price').value = sponsorshipPlan['price'];
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_description').value = sponsorshipPlan['description'];
    }
}
//# sourceMappingURL=SponsorshipPlanModalController.js.map