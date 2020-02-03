import { Controller }           from './../../core/Controller.js';
import { SpeakerModel }         from './../model/SpeakerModel.js';
import { MessageModel }         from './../model/MessageModel.js';
import { Logger }               from './../../util/Logger.js';
import { MessageBuilder }       from './../../util/MessageBuilder.js';
import { DataEntity, Config }   from './../../conf/Config.js';

export class SpeakerController extends Controller {

    private _elements:      Array<HTMLElement>
    private _speakerModel:  SpeakerModel;
    private _messageModel:  MessageModel;
    private _speakerData;
    private _messages;

    constructor() {

        super();
        this._messageModel = new MessageModel(DataEntity._SPEAKER_MESSAGES_);
        this._speakerModel = new SpeakerModel();
        this._initializeElements();
        this._getPageMessages();

    }

    private _initializeElements(): void {

        this._elements = new Array<HTMLElement>();

    }

    private _getPageMessages(): void {

        this._messages = this._messageModel.all();

        this._messages

            .then(data => {

                data['pt-BR'].forEach(message => {
                
                    Object.keys(message).forEach(key => {
    
                        MessageBuilder.buildMessage(this._elements[(message['id']) ? message['id'] : (message['tag'])], key, message[key]);
    
                    });
                
                });

            })

            .catch(error => Logger.log(error));

    }

    private _getPageContent(): void {

        this._speakerData = this._speakerModel.all();

        this._speakerData.then(data => {

        })

        .catch(error => Logger.log(error));

    }

    public search(key: string, value: string): void {

        let speaker = this._speakerModel.find(key, value);

    }


}