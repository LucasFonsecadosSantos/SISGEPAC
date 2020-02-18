import { Controller }                       from './../../core/Controller.js';
import { ActivityModel }                    from './../model/ActivityModel.js';
import { MessageModel }                     from './../model/MessageModel.js';
import { MessageBuilder }                   from './../../util/MessageBuilder.js';
import { Config, DataEntity }               from './../../conf/Config.js';
import { Logger }                           from './../../util/Logger.js';
import { ActivityRegisterModalElements }    from './../elements/ActivityRegisterModelElements.js';
import { SpeakerModel }                     from './../model/SpeakerModel.js';


export class ActivityRegisterModalController extends Controller {

    private _elements:      Map<string, HTMLElement>;
    private _messageModel:  MessageModel;
    private _speakerModel:  SpeakerModel;
    private _activityModel: ActivityModel;
    private _messageData;
    private _activityData;

    constructor() {

        super();
        this._messageModel  = new MessageModel(DataEntity._ACTIVITY_REGISTER_MODAL_MESSAGES_);
        this._activityModel = new ActivityModel();
        this._elements      = ActivityRegisterModalElements.ELEMENTS;
        this._getPageMessages();

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

    public create(): void {

        //@ts-ignore
        $('#activityRegisterModal').modal('show');
        //this._clearInputs();
        this._populateSpeakerList();
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_update').classList.add('d-none');
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_create').classList.remove('d-none');

    }

    private _populateSpeakerList(): void {

        let speakerModel: SpeakerModel = new SpeakerModel();
        speakerModel.all().then(data => {

            let fragment:       DocumentFragment = document.createDocumentFragment();
            let optionElement:  HTMLOptionElement;

            data.forEach(speaker => {

                optionElement = <HTMLOptionElement> document.createElement('OPTION');
                optionElement.setAttribute('value', speaker['id']);
                optionElement.textContent = speaker['name'];
                fragment.appendChild(optionElement);

            });

            ActivityRegisterModalElements.ELEMENTS.get('activity_register_data_responsible').appendChild(fragment);

        })

        .catch(error => Logger.log('Activity Register Modal Controller: ' + error));
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_data_responsible')

    }

    private _clearInputs(): void {

        this._elements.forEach(element => {

            if (element.nodeName === 'INPUT') {
                element.nodeValue = "";
            }

        });

    }

    public update(id: string): void {}

    public delete(id: string): void {}

}