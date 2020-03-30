import { Controller }                       from './../../core/Controller.js';
import { SponsorshipModel }                 from './../model/SponsorshipModel.js';
import { SponsorshipModalElements}          from './../elements/SponsorshipModalElements.js';
import { MessageModel }                     from './../model/MessageModel.js';
import { MessageBuilder }                   from './../../util/MessageBuilder.js';
import { Config, DataEntity }               from './../../conf/Config.js';
import { Logger }                           from './../../util/Logger.js';
import { Updater }                          from './../../util/Updater.js';
import { InvalidDataKeyException }          from './../../exception/InvalidDataKeyException.js';
import { Identificator }                    from './../../util/Indentificator.js';


export class SponsorshipModalController extends Controller {

    private _messageModel:          MessageModel;
    private _sponsorshipModel:  SponsorshipModel;

    constructor() {

        super();
        this._messageModel          = new MessageModel(DataEntity._SPONSORSHIP_MODAL_MESSAGES_);
        this._sponsorshipModel      = new SponsorshipModel();
        this._getPageMessages();
        this._initListeners();

    }

    private _getPageMessages(): void {

        let messageData  = this._messageModel.all();

        messageData.then(data => {

            data['pt-BR'].forEach(message => {

                Object.keys(message).forEach(key => {

                    MessageBuilder.buildMessage(SponsorshipModalElements.ELEMENTS.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                    
                });
                
            });

        })

        .catch(error => Logger.log(error));

    }

    public create(): void {

        //@ts-ignore
        $('#sponsorshipModal').modal('show');
        //this._clearInputs();
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_update').classList.add('d-none');
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_create').classList.remove('d-none');

    }


    private _clearInputs(): void {

        SponsorshipModalElements.ELEMENTS.forEach(element => {

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
        $('#sponsorshipModal').modal('show');
        //this._clearInputs();
        let sponsorshipModel = new SponsorshipModel();
        let sponsorship = sponsorshipModel.find('id', id);
        sponsorship.then(data => this._populate(data));
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_update').classList.remove('d-none');
        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_create').classList.add('d-none');

    }

    public delete(id: string): void {

        this._sponsorshipModel.delete('id', id);
        Updater.updateData();

    }

    private _initListeners(): void {

        this._initCreateButtonListener();
        this._initUpdateButtonListener();
    }

    private _initCreateButtonListener(): void {

        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_create').addEventListener('click', event => {
            
            document.querySelector('#sponsorshipModal').addEventListener('DOMAttrModified', event => {

                //@ts-ignore
                if ((document.querySelector('#sponsorshipModal') as HTMLElement).style.display === 'none') {
                    
                    Updater.updateData();

                }
    
            });

            try {                

                this._sponsorshipModel.imageUpload(new FormData((SponsorshipModalElements.ELEMENTS.get('dataForm') as HTMLFormElement)))

                    .then(response => {

                        this._sponsorshipModel.insert(

                            {

                                "id":                   (((SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_id') as HTMLInputElement).value === '') || (!(SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_id') as HTMLInputElement).value)) ? Identificator.generateID(): (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_id') as HTMLInputElement).value,
                                "name":                 (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_name') as HTMLInputElement).value,
                                "avatar":               ((response['data_name'] === '') || (!response['data_name'])) ? "default-avatar.png" : response['data_name'],
                                "description":          (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_description') as HTMLTextAreaElement).value,
                                "price":                (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_price') as HTMLInputElement).value,
                                "website":              (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_website') as HTMLInputElement).value,
                                "email":                (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_email') as HTMLInputElement).value,
                                "telephone":            (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_telephone') as HTMLInputElement).value,
                                "sponsorship_plan_id":  (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_sponsorship-plan-id') as HTMLInputElement).value,
                                "social-networks":  {
                                    "facebook":         "",//(SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-facebook') as HTMLInputElement).value,
                                    "twitter":          "",//(SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-twitter') as HTMLInputElement).value,
                                    "instagram":        "",//(SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-instagram') as HTMLInputElement).value,
                                    "pinterest":        "",//(SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-pinterest') as HTMLInputElement).value,
                                    "linkedin":         "",//(SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-linkedin') as HTMLInputElement).value,
                                    "lattes":           "",//(SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-lattes') as HTMLInputElement).value,
                                    "github":           "",//(SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-github') as HTMLInputElement).value,
                                    "youtube":          "",//(SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-youtube') as HTMLInputElement).value
                                },
                                "visible": true
    
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
            $('#sponsorshipModal').modal('hide');

        }, false);

    }

    private _initUpdateButtonListener(): void {

        SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_button_update').addEventListener('click', event => {

            document.querySelector('#sponsorshipModal').addEventListener('DOMAttrModified', event => {

                //@ts-ignore
                if ((document.querySelector('#sponsorshipModal') as HTMLElement).style.display === 'none') {
                    Updater.updateData();
                }
    
            });

            this._sponsorshipModel.update(
                {
                    "name":                 (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_name') as HTMLInputElement).value,
                    //"avatar":           ((response['data_name'] === '') || (!response['data_name'])) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                    "description":          (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_description') as HTMLTextAreaElement).value,
                    "price":                (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_price') as HTMLInputElement).value,
                    "website":              (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_website') as HTMLInputElement).value,
                    "email":                (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_email') as HTMLInputElement).value,
                    "telephone":            (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_telephone') as HTMLInputElement).value,
                    "sponsorship_plan_id":  (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_sponsorship-plan-id') as HTMLInputElement).value,
                    "social-networks":  {
                        "facebook":         (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-facebook') as HTMLInputElement).value,
                        "twitter":          (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-twitter') as HTMLInputElement).value,
                        "instagram":        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-instagram') as HTMLInputElement).value,
                        "pinterest":        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-pinterest') as HTMLInputElement).value,
                        "linkedin":         (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-linkedin') as HTMLInputElement).value,
                        "lattes":           (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-lattes') as HTMLInputElement).value,
                        "github":           (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-github') as HTMLInputElement).value,
                        "youtube":          (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-youtube') as HTMLInputElement).value
                    },
                    "visible": true
                },
                {
                    "id": (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_id') as HTMLInputElement).value
                }
            );
        
            //@ts-ignore
            $('#sponsorshipModal').modal('hide');

        }, false);

    }

    private _populate(sponsorship: Object): void {

        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_name')                       as HTMLInputElement).value      = sponsorship['name'];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_id')                         as HTMLInputElement).value      = sponsorship['id'];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_price')                      as HTMLSelectElement).value     = sponsorship['price'];
        //((response['data_name'] === '') || (!response['data_name'])) ? "default-avatar.png" : response['data_name'],
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_description')                as HTMLTextAreaElement).value   = sponsorship["description"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_website')                    as HTMLInputElement).value      = sponsorship["website"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_email')                      as HTMLInputElement).value      = sponsorship["email"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_telephone')                  as HTMLInputElement).value      = sponsorship["telephone"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_sponsorship-plan-id')        as HTMLInputElement).value      = sponsorship["sponsorship_plan_id"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-facebook')    as HTMLInputElement).value      = sponsorship["social-networks"]["facebook"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-twitter')     as HTMLInputElement).value      = sponsorship["social-networks"]["twitter"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-instagram')   as HTMLInputElement).value      = sponsorship["social-networks"]["instagram"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-pinterest')   as HTMLInputElement).value      = sponsorship["social-networks"]["pinterest"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-linkedin')    as HTMLInputElement).value      = sponsorship["social-networks"]["linkedin"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-lattes')      as HTMLInputElement).value      = sponsorship["social-networks"]["lattes"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-github')      as HTMLInputElement).value      = sponsorship["social-networks"]["github"];
        (SponsorshipModalElements.ELEMENTS.get('sponsorship_modal_data_social-network-youtube')     as HTMLInputElement).value      = sponsorship["social-networks"]["youtube"];

    }

}