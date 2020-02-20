import { Controller }                   from './../../core/Controller.js';
import { MessageModel }                 from './../model/MessageModel.js';
import { SpeakerModel }                 from './../model/SpeakerModel.js';
import { DataEntity }                   from './../../conf/Config.js';
import { MessageBuilder }               from './../../util/MessageBuilder.js';
import { Logger }                       from './../../util/Logger.js';
import { InvalidDataKeyException }      from './../../exception/InvalidDataKeyException.js';
import { Identificator }                from './../../util/Indentificator.js';
import { Updater }                      from './../../util/Updater.js';
import { SpeakerRegisterModalElements } from './../elements/SpeakerRegisterModalElements.js';


export class SpeakerRegisterModalController extends Controller {

    private _elements:      Map<String, HTMLElement>;
    private _messageModel:  MessageModel;
    private _speakerModel:  SpeakerModel;
    private _messageData;
    private _speakerData;

    constructor() {

        super();
        this._messageModel  =   new MessageModel(DataEntity._SPEAKER_REGISTER_MODAL_MESSAGES_);
        this._speakerModel  =   new SpeakerModel();
        this._elements      =   SpeakerRegisterModalElements.ELEMENTS;
        this._getPageMessages();
        this._initListeners();

    }

    private _getPageMessages(): void {

        this._messageData  = this._messageModel.all();

        this._messageData.then(data => {

            let elementKey: string;

            data['pt-BR'].forEach(message => {

                Object.keys(message).forEach(key => {
                    
                    MessageBuilder.buildMessage(this._elements.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                    
                });
                
            });

        })

        .catch(error => Logger.log(error));

    }

    private _initListeners(): void {

        this._elements.get('speaker_register_button_create').addEventListener('click', event => {

            document.querySelector('#speakerRegisterModal').addEventListener('DOMAttrModified', event => {

                //@ts-ignore
                if ((document.querySelector('#speakerRegisterModal') as HTMLElement).style.display === 'none') {
                    
                    Updater.updateData();
    
                }
    
            });

            try {

                this._speakerModel.imageUpload(new FormData(this._elements['dataForm']))

                    .then(response => {
                        
                        this._speakerModel.insert({

                            "id":           (this._elements.get('speaker_register_data_id') as HTMLInputElement).value === "" || !((this._elements.get('speaker_register_data_id') as HTMLInputElement).value) ? Identificator.generateID() : (this._elements.get('speaker_register_data_id') as HTMLInputElement).value,
                            "name":         (this._elements.get('speaker_register_data_name')            as HTMLInputElement).value,
                            "jobInstitute": (this._elements.get('speaker_register_data_jobInstitute')    as HTMLInputElement).value,
                            "description":  (this._elements.get('speaker_register_data_description')     as HTMLInputElement).value,
                            "email":        (this._elements.get('speaker_register_data_email')           as HTMLInputElement).value,
                            "social-networks": {
                                "facebook":     (this._elements.get('speaker_register_data_socialNetworks-facebook')    as HTMLInputElement).value,
                                "twitter":      (this._elements.get('speaker_register_data_socialNetworks-twitter')     as HTMLInputElement).value,
                                "linkedin":     (this._elements.get('speaker_register_data_socialNetworks-linkedin')    as HTMLInputElement).value,
                                "spotify":      (this._elements.get('speaker_register_data_socialNetworks-spotify')     as HTMLInputElement).value,
                                "youtube":      (this._elements.get('speaker_register_data_socialNetworks-youtube')     as HTMLInputElement).value,
                                "behance":      (this._elements.get('speaker_register_data_socialNetworks-behance')     as HTMLInputElement).value,
                                "lattes":       (this._elements.get('speaker_register_data_socialNetworks-lattes')      as HTMLInputElement).value,
                                "pinterest":    (this._elements.get('speaker_register_data_socialNetworks-pinterest')   as HTMLInputElement).value,
                                "blog":         (this._elements.get('speaker_register_data_socialNetworks-blog')        as HTMLInputElement).value,
                            },
                            "avatar":   ((!response['data_name']) || (response['data_name'] === "")) ? "/local/img/structure/default-avatar.png" : response['data_name'],
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
            $('#speakerRegisterModal').modal('hide');
        
        }, false);

        

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
        $('#speakerRegisterModal').modal('show');
        this._clearInputs();
        this._elements.get('speaker_register_button_update').classList.add('d-none');
        this._elements.get('speaker_register_button_create').classList.remove('d-none');

    }

    private _clearInputs(): void {

        this._elements.forEach(element => {

            if (element.nodeName === 'INPUT') {
                element.nodeValue = "";
            }

        });

    }

    private _initInputDescriptionListeners(): void {

        this._elements.get('speaker_register_data_description').addEventListener('focus', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                this._elements.get('speaker_register_label_helper-description').textContent = "Você pode digitar 35 letras.";

            }

        });

        this._elements.get('speaker_register_data_description').addEventListener('blur', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                this._elements.get('speaker_register_label_helper-description').textContent = "";

            }

        });
        
        this._elements.get('speaker_register_data_description').addEventListener('keypress', event => {

            let size = (event.target as HTMLInputElement).value.length;

            if ((event.target as HTMLInputElement).focus) {
             
                this._elements.get('speaker_register_label_helper-description').textContent = "Você pode digitar mais " + (90 - size) + " caracteres.";
            
            } else {

                this._elements.get('speaker_register_label_helper-description').textContent = "";

            }

        });

    }

    private _initInputJobInstituteListeners(): void {

        this._elements.get('speaker_register_data_jobInstitute').addEventListener('focus', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                this._elements.get('speaker_register_label_helper-jobInstitute').textContent = "Você pode digitar 35 caracteres.";

            }

        });

        this._elements.get('speaker_register_data_jobInstitute').addEventListener('blur', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                this._elements.get('speaker_register_label_helper-jobInstitute').textContent = "";

            }

        });
        
        this._elements.get('speaker_register_data_jobInstitute').addEventListener('keypress', event => {

            let size = (event.target as HTMLInputElement).value.length;

            if ((event.target as HTMLInputElement).focus) {
             
                this._elements.get('speaker_register_label_helper-jobInstitute').textContent = "Você pode digitar mais " + (50 - size) + " letras.";
            
            } else {

                this._elements.get('speaker_register_label_helper-jobInstitute').textContent = "";

            }

        });

    }

    private _initInputNameListeners(): void {

        this._elements.get('speaker_register_data_name').addEventListener('focus', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                this._elements.get('speaker_register_label_helper-name').textContent = "Você pode digitar 35 letras.";

            }

        });

        this._elements.get('speaker_register_data_name').addEventListener('blur', event => {

            if ((event.target as HTMLInputElement).value.length === 0) {

                this._elements.get('speaker_register_label_helper-name').textContent = "";

            }

        });
        
        this._elements.get('speaker_register_data_name').addEventListener('keypress', event => {

            let size = (event.target as HTMLInputElement).value.length;

            if ((event.target as HTMLInputElement).focus) {
             
                this._elements.get('speaker_register_label_helper-name').textContent = "Você pode digitar mais " + (35 - size) + " letras.";
            
            } else {

                this._elements.get('speaker_register_label_helper-name').textContent = "";

            }

        });


    }

    public update(id: string) {

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
                    if ((document.querySelector('#speakerRegisterModal') as HTMLElement).style.display === 'none') {
                        
                        Updater.updateData();
        
                    }
        
                });
                
                try {
                    
                    this._speakerModel.update(
                        {
                            "id":           (this._elements.get('speaker_register_data_id')             as HTMLInputElement).value,
                            "name":         (this._elements.get('speaker_register_data_name')           as HTMLInputElement).value,
                            "jobInstitute": (this._elements.get('speaker_register_data_jobInstitute')   as HTMLInputElement).value,
                            "description":  (this._elements.get('speaker_register_data_description')    as HTMLInputElement).value,
                            "email":        (this._elements.get('speaker_register_data_email')          as HTMLInputElement).value,
                            "social-networks": {
                                "facebook":     (this._elements.get('speaker_register_data_socialNetworks-facebook')    as HTMLInputElement).value,
                                "twitter":      (this._elements.get('speaker_register_data_socialNetworks-twitter')     as HTMLInputElement).value,
                                "linkedin":     (this._elements.get('speaker_register_data_socialNetworks-linkedin')    as HTMLInputElement).value,
                                "spotify":      (this._elements.get('speaker_register_data_socialNetworks-spotify')     as HTMLInputElement).value,
                                "youtube":      (this._elements.get('speaker_register_data_socialNetworks-youtube')     as HTMLInputElement).value,
                                "behance":      (this._elements.get('speaker_register_data_socialNetworks-behance')     as HTMLInputElement).value,
                                "lattes":       (this._elements.get('speaker_register_data_socialNetworks-lattes')      as HTMLInputElement).value,
                                "pinterest":    (this._elements.get('speaker_register_data_socialNetworks-pinterest')   as HTMLInputElement).value,
                                "blog":         (this._elements.get('speaker_register_data_socialNetworks-blog')        as HTMLInputElement).value,
                            },
                            //"avatar":   ((!response['data_name']) || (response['data_name'] === "")) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                            "show": true
        
                        },{
                            
                            "id": (this._elements.get('speaker_register_data_id') as HTMLInputElement).value

                        }
                    );
    
                } catch (exception) {
                    
                    if (exception instanceof InvalidDataKeyException) {
    
                        Logger.log("Update Exception: " + exception.message);
    
                    }
    
                }
    
                //@ts-ignore
                $('#speakerRegisterModal').modal('hide');
    
            });

        });
        

    }

    private _populateInformations(speaker: Object): void {

        (this._elements.get('speaker_register_data_name')                       as HTMLInputElement).value      = speaker['name'];
        (this._elements.get('speaker_register_data_jobInstitute')               as HTMLInputElement).value      = speaker['jobInstitute'];
        //(this._elements.get('speaker_register_data_avatar')                     as HTMLInputElement).value      = speaker['avatar'];
        (this._elements.get('speaker_register_data_id')                         as HTMLInputElement).value      = speaker['id'];
        (this._elements.get('speaker_register_data_description')                as HTMLTextAreaElement).value   = speaker['description'];
        (this._elements.get('speaker_register_data_email')                      as HTMLInputElement).value      = speaker['email'];
        (this._elements.get('speaker_register_data_socialNetworks-facebook')    as HTMLInputElement).value      = speaker['social-networks']['facebook'];
        (this._elements.get('speaker_register_data_socialNetworks-youtube')     as HTMLInputElement).value      = speaker['social-networks']['youtube'];
        (this._elements.get('speaker_register_data_socialNetworks-pinterest')   as HTMLInputElement).value      = speaker['social-networks']['pinterest'];
        (this._elements.get('speaker_register_data_socialNetworks-twitter')     as HTMLInputElement).value      = speaker['social-networks']['twitter'];
        (this._elements.get('speaker_register_data_socialNetworks-lattes')      as HTMLInputElement).value      = speaker['social-networks']['lattes'];
        (this._elements.get('speaker_register_data_socialNetworks-github')      as HTMLInputElement).value      = speaker['social-networks']['github'];
        (this._elements.get('speaker_register_data_socialNetworks-spotify')     as HTMLInputElement).value      = speaker['social-networks']['spotify'];
        (this._elements.get('speaker_register_data_socialNetworks-linkedin')    as HTMLInputElement).value      = speaker['social-networks']['linkedin'];
        (this._elements.get('speaker_register_data_socialNetworks-behance')     as HTMLInputElement).value      = speaker['social-networks']['behance'];
        (this._elements.get('speaker_register_data_socialNetworks-blog')        as HTMLInputElement).value      = speaker['social-networks']['blog'];

    }

}