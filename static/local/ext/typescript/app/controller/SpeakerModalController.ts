import { Controller }                   from './../../core/Controller.js';
import { MessageModel }                 from './../model/MessageModel.js';
import { SpeakerModel }                 from './../model/SpeakerModel.js';
import { DataEntity }                   from './../../conf/Config.js';
import { MessageBuilder }               from './../../util/MessageBuilder.js';
import { Logger }                       from './../../util/Logger.js';
import { InvalidDataKeyException }      from './../../exception/InvalidDataKeyException.js';
import { Identificator }                from './../../util/Indentificator.js';
import { Updater }                      from './../../util/Updater.js';
import { SpeakerModalElements }         from './../elements/SpeakerModalElements.js';


export class SpeakerModalController extends Controller {

    private _elements:      Map<String, HTMLElement>;
    private _messageModel:  MessageModel;
    private _speakerModel:  SpeakerModel;
    private _messageData;
    private _speakerData;

    constructor() {

        super();
        this._messageModel  =   new MessageModel(DataEntity._SPEAKER_MODAL_MESSAGES_);
        this._speakerModel  =   new SpeakerModel();
        this._getPageMessages();
        this._initListeners();

    }

    private _getPageMessages(): void {

        this._messageData  = this._messageModel.all();

        this._messageData.then(data => {

            data['pt-BR'].forEach(message => {

                Object.keys(message).forEach(key => {
                    
                    MessageBuilder.buildMessage(SpeakerModalElements.ELEMENTS.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                    
                });
                
            });

        })

        .catch(error => Logger.log(error));

    }

    private _initListeners(): void {

        SpeakerModalElements.ELEMENTS.get('speaker_modal_button_create').addEventListener('click', event => {

            document.querySelector('#speakerModal').addEventListener('DOMAttrModified', event => {

                //@ts-ignore
                if ((document.querySelector('#speakerModal') as HTMLElement).style.display === 'none') {
                    
                    Updater.updateData();
    
                }
    
            });

            try {

                this._speakerModel.imageUpload(new FormData((SpeakerModalElements.ELEMENTS.get('speaker_modal_dataForm') as HTMLFormElement)))

                    .then(response => {
                        
                        this._speakerModel.insert({

                            "id":           (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id') as HTMLInputElement).value === "" || !((SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id') as HTMLInputElement).value) ? Identificator.generateID() : (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id') as HTMLInputElement).value,
                            "name":         (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name')            as HTMLInputElement).value,
                            "jobInstitute": (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute')    as HTMLInputElement).value,
                            "description":  (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description')     as HTMLInputElement).value,
                            "email":        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_email')           as HTMLInputElement).value,
                            "social-networks": {
                                "facebook":     (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-facebook')    as HTMLInputElement).value,
                                "twitter":      (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-twitter')     as HTMLInputElement).value,
                                "linkedin":     (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-linkedin')    as HTMLInputElement).value,
                                "spotify":      (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-spotify')     as HTMLInputElement).value,
                                "youtube":      (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-youtube')     as HTMLInputElement).value,
                                "behance":      (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-behance')     as HTMLInputElement).value,
                                "lattes":       (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-lattes')      as HTMLInputElement).value,
                                "pinterest":    (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-pinterest')   as HTMLInputElement).value,
                                "blog":         (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-blog')        as HTMLInputElement).value,
                            },
                            "avatar":   ((!response['data_name']) || (response['data_name'] === "")) ? "default-avatar.svg" : response['data_name'],
                            "show": true
        
                        });
                        
                    })

                    .catch(error => Logger.log(error));
        


            } catch (exception) {
                
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
                if ((document.querySelector('#speakerModal') as HTMLElement).style.display === 'none') {
                    
                    Updater.updateData();
    
                }
    
            });
            
            try {
                
                this._speakerModel.update(

                    {
                        "id":           (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id')             as HTMLInputElement).value,
                        "name":         (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name')           as HTMLInputElement).value,
                        "jobInstitute": (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute')   as HTMLInputElement).value,
                        "description":  (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description')    as HTMLInputElement).value,
                        "email":        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_email')          as HTMLInputElement).value,
                        "social-networks": {
                            "facebook":     (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-facebook')    as HTMLInputElement).value,
                            "twitter":      (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-twitter')     as HTMLInputElement).value,
                            "linkedin":     (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-linkedin')    as HTMLInputElement).value,
                            "spotify":      (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-spotify')     as HTMLInputElement).value,
                            "youtube":      (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-youtube')     as HTMLInputElement).value,
                            "behance":      (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-behance')     as HTMLInputElement).value,
                            "lattes":       (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-lattes')      as HTMLInputElement).value,
                            "pinterest":    (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-pinterest')   as HTMLInputElement).value,
                            "blog":         (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-blog')        as HTMLInputElement).value,
                        },
                        //"avatar":   ((!response['data_name']) || (response['data_name'] === "")) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                        "show": true
    
                    },{
                        
                        "id": (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id') as HTMLInputElement).value

                    }
                );

            } catch (exception) {
                
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

    public delete(id: string): void {

        this._speakerModel.delete('id', id);
        Updater.updateData();
        

    }

    public create(): void {

        //@ts-ignore
        $('#speakerModal').modal('show');
        this._clearInputs();
        SpeakerModalElements.ELEMENTS.get('speaker_modal_button_update').classList.add('d-none');
        SpeakerModalElements.ELEMENTS.get('speaker_modal_button_create').classList.remove('d-none');

    }

    private _clearInputs(): void {

        this._elements.forEach(element => {

            if (element.nodeName === 'INPUT') {
                element.nodeValue = "";
            }

        });

    }

    private _initInputDescriptionListeners(): void {

        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description').addEventListener('focus', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-description').textContent = "Você pode digitar 35 letras.";

            }

        });

        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description').addEventListener('blur', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-description').textContent = "";

            }

        });
        
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description').addEventListener('keypress', event => {

            let size = (event.target as HTMLInputElement).value.length;

            if ((event.target as HTMLInputElement).focus) {
             
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-description').textContent = "Você pode digitar mais " + (90 - size) + " caracteres.";
            
            } else {

                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-description').textContent = "";

            }

        });

    }

    private _initInputJobInstituteListeners(): void {

        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute').addEventListener('focus', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-jobInstitute').textContent = "Você pode digitar 35 caracteres.";

            }

        });

        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute').addEventListener('blur', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-jobInstitute').textContent = "";

            }

        });
        
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute').addEventListener('keypress', event => {

            let size = (event.target as HTMLInputElement).value.length;

            if ((event.target as HTMLInputElement).focus) {
             
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-jobInstitute').textContent = "Você pode digitar mais " + (50 - size) + " letras.";
            
            } else {

                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-jobInstitute').textContent = "";

            }

        });

    }

    private _initInputNameListeners(): void {

        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name').addEventListener('focus', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-name').textContent = "Você pode digitar 35 letras.";

            }

        });

        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name').addEventListener('blur', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-name').textContent = "";

            }

        });
        
        SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name').addEventListener('keypress', event => {

            let size = (event.target as HTMLInputElement).value.length;

            if ((event.target as HTMLInputElement).focus) {
             
                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-name').textContent = "Você pode digitar mais " + (35 - size) + " letras.";
            
            } else {

                SpeakerModalElements.ELEMENTS.get('speaker_modal_label_helper-name').textContent = "";

            }

        });


    }

    public update(id: string) {

        //@ts-ignore
        $('#speakerModal').modal('show');
        let speaker = this._speakerModel.find('id', id);
        speaker.then(data => this._populateInformations(data));
        SpeakerModalElements.ELEMENTS.get('speaker_modal_button_update').classList.remove('d-none');
        SpeakerModalElements.ELEMENTS.get('speaker_modal_button_create').classList.add('d-none');
        

    }

    private _populateInformations(speaker: Object): void {

        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_name')                       as HTMLInputElement).value      = speaker['name'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_jobInstitute')               as HTMLInputElement).value      = speaker['jobInstitute'];
        //(this._elements.get('speaker_register_data_avatar')                     as HTMLInputElement).value      = speaker['avatar'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_id')                         as HTMLInputElement).value      = speaker['id'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_description')                as HTMLTextAreaElement).value   = speaker['description'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_email')                      as HTMLInputElement).value      = speaker['email'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-facebook')    as HTMLInputElement).value      = speaker['social-networks']['facebook'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-youtube')     as HTMLInputElement).value      = speaker['social-networks']['youtube'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-pinterest')   as HTMLInputElement).value      = speaker['social-networks']['pinterest'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-twitter')     as HTMLInputElement).value      = speaker['social-networks']['twitter'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-lattes')      as HTMLInputElement).value      = speaker['social-networks']['lattes'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-github')      as HTMLInputElement).value      = speaker['social-networks']['github'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-spotify')     as HTMLInputElement).value      = speaker['social-networks']['spotify'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-linkedin')    as HTMLInputElement).value      = speaker['social-networks']['linkedin'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-behance')     as HTMLInputElement).value      = speaker['social-networks']['behance'];
        (SpeakerModalElements.ELEMENTS.get('speaker_modal_data_socialNetworks-blog')        as HTMLInputElement).value      = speaker['social-networks']['blog'];

    }

}