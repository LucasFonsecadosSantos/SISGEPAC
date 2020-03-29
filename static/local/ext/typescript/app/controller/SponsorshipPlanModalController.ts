import { Controller }                       from './../../core/Controller.js';
import { SponsorshipPlanModel }             from './../model/SponsorshipPlanModel.js';
import { SponsorshipPlanModalElements}      from './../elements/SponsorshipPlanModalElements.js';
import { MessageModel }                     from './../model/MessageModel.js';
import { MessageBuilder }                   from './../../util/MessageBuilder.js';
import { Config, DataEntity }               from './../../conf/Config.js';
import { Logger }                           from './../../util/Logger.js';
import { Updater }                          from './../../util/Updater.js';
import { InvalidDataKeyException }          from './../../exception/InvalidDataKeyException.js';
import { Identificator }                    from './../../util/Indentificator.js';


export class SponsorshipPlanModalController extends Controller {

    private _messageModel:          MessageModel;
    private _sponsorshipPlanModel:  SponsorshipPlanModel;

    constructor() {

        super();
        this._messageModel          = new MessageModel(DataEntity._SPONSORSHIP_PLAN_MODAL_MESSAGES_);
        this._sponsorshipPlanModel  = new SponsorshipPlanModel();
        this._getPageMessages();
        this._initListeners();

    }

    private _getPageMessages(): void {

        let messageData  = this._messageModel.all();

        messageData.then(data => {

            data['pt-BR'].forEach(message => {

                Object.keys(message).forEach(key => {

                    MessageBuilder.buildMessage(SponsorshipPlanModalElements.ELEMENTS.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                    
                });
                
            });

        })

        .catch(error => Logger.log(error));

    }

    public create(): void {

        //@ts-ignore
        $('#sponsorshipPlanModal').modal('show');
        //this._clearInputs();
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_update').classList.add('d-none');
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_create').classList.remove('d-none');

    }


    private _clearInputs(): void {

        SponsorshipPlanModalElements.ELEMENTS.forEach(element => {

            if (element.nodeName === 'INPUT') {
                element.nodeValue = "";
            }

            if (element.nodeName === 'SELECT') {
                element.innerHTML = '';
                let option: HTMLOptionElement = <HTMLOptionElement> document.createElement('OPTION');
                option.setAttribute('select', 'selected');
                option.setAttribute('value', 'default');
                option.textContent = '- SELECIONE -';
                element.appendChild(option);
            }

        });

    }

    public update(id: string): void {

        //@ts-ignore
        $('#sponsorshipPlanModal').modal('show');
        //this._clearInputs();
        let sponsorshipPlanModel = new SponsorshipPlanModel();
        let sponsorshipPlan = sponsorshipPlanModel.find('id', id);
        sponsorshipPlan.then(data => this._populate(data));
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_update').classList.remove('d-none');
        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_create').classList.add('d-none');

    }

    public delete(id: string): void {

        this._sponsorshipPlanModel.delete('id', id);
        Updater.updateData();

    }

    private _initListeners(): void {

        this._initCreateButtonListener();
        this._initUpdateButtonListener();
    }

    private _initCreateButtonListener(): void {

        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_create').addEventListener('click', event => {

            document.querySelector('#sponsorshipPlanModal').addEventListener('DOMAttrModified', event => {

                //@ts-ignore
                if ((document.querySelector('#sponsorshipPlanModal') as HTMLElement).style.display === 'none') {
                    
                    Updater.updateData();

                }
    
            });

            try {
            
                this._sponsorshipPlanModel.imageUpload(new FormData((SponsorshipPlanModalElements.ELEMENTS.get('dataForm') as HTMLFormElement)))

                    .then(response => {
                        
                        this._sponsorshipPlanModel.insert(

                            {

                                "id":               (((SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_id') as HTMLInputElement).value === '') || (!(SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_id') as HTMLInputElement).value)) ? Identificator.generateID(): (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_id') as HTMLInputElement).value,
                                "name":             (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_name') as HTMLInputElement).value,
                                "avatar":           ((response['data_name'] === '') || (!response['data_name'])) ? "default-avatar.png" : response['data_name'],
                                "description":      (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_description') as HTMLTextAreaElement).value,
                                "price":            (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_price') as HTMLInputElement).value
    
                            }

                        );
                    })

                    .catch(error => Logger.log(error));

                } catch (exception) {
                    
                    if (exception instanceof InvalidDataKeyException) {
                        
                        Logger.log("Update Exception: " + exception.message);
    
                    }
    
                }
            
            //@ts-ignore
            $('#sponsorshipPlanModal').modal('hide');

        }, false);

    }

    private _initUpdateButtonListener(): void {

        SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_button_update').addEventListener('click', event => {

            document.querySelector('#sponsorshipPlanModal').addEventListener('DOMAttrModified', event => {

                //@ts-ignore
                if ((document.querySelector('#sponsorshipPlanModal') as HTMLElement).style.display === 'none') {
                    Updater.updateData();
                }
    
            });

            this._sponsorshipPlanModel.update(
                {
                    "name":             (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_name') as HTMLInputElement).value,
                    //"avatar":           ((response['data_name'] === '') || (!response['data_name'])) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                    "description":      (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_description') as HTMLTextAreaElement).value,
                    "price":            (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_price') as HTMLInputElement).value,
                },
                {
                    "id": (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_id') as HTMLInputElement).value
                }
            );
        
            //@ts-ignore
            $('#sponsorshipPlanModal').modal('hide');

        }, false);

    }

    private _populate(sponsorshipPlan: Object): void {

        (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_title')         as HTMLInputElement).value      = sponsorshipPlan['title'];
        (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_id')            as HTMLInputElement).value      = sponsorshipPlan['id'];
        (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_price')         as HTMLSelectElement).value     = sponsorshipPlan['price'];
        (SponsorshipPlanModalElements.ELEMENTS.get('sponsorshipplan_modal_data_description')   as HTMLSelectElement).value     = sponsorshipPlan['description'];

    }

}