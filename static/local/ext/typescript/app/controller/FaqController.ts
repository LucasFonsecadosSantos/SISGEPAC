import { Controller }           from './../../core/Controller.js';
import { Config, DataEntity }   from './../../conf/Config.js';
import { MessageBuilder }       from './../../util/MessageBuilder.js';
import { Logger }               from './../../util/Logger.js';
import { FaqModel }             from './../../app/model/FaqModel.js';
import { MessageModel }         from './../../app/model/MessageModel.js';

export class FaqController extends Controller {

    private _elements:      Array<HTMLElement>;
    private _messageModel:  MessageModel;
    private _faqModel:      FaqModel;
    private _faqData;
    private _messageData;

    constructor() {

        super();
        this._messageModel  = new MessageModel(DataEntity._FAQ_MESSAGES_);
        this._faqModel      = new FaqModel();
        this._initializeElements();
        this._getPageMessages();

    }

    private _getPageMessages(): void {
        
        this._messageData = this._messageModel.all();

        this._messageData.then(data => {

            data['pt-BR'].forEach(message => {

                Object.keys(message).forEach(key => {

                    MessageBuilder.buildMessage(this._elements[(message['id']) ? message['id'] : (message['tag'])], key, message[key]);
                    
                });

            })

        })

        .catch(error => Logger.log(error));

    }

    private _initializeElements(): void {

        this._elements = new Array<HTMLElement>();


        
    }

    
}