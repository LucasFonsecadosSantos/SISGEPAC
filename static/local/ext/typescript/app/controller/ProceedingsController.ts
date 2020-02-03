import { Controller }           from './../../core/Controller.js';
import { DataEntity, Config }   from './../../conf/Config.js';
import { Logger }               from './../../util/Logger.js';
import { MessageBuilder }       from './../../util/MessageBuilder.js';
import { MessageModel }         from './../model/MessageModel.js';
import { ProceedingsModel }     from './../model/ProceedingsModel.js';

export class ProceedingsController extends Controller {

    private _elements:          Array<HTMLElement>;
    private _messageModel:      MessageModel;
    private _proceedingsModel:  ProceedingsModel;
    private _messageData;
    private _proceedingsData;

    constructor() {

        super();
        this._messageModel      = new MessageModel(DataEntity._PROCEEDINGS_MESSAGES_);
        this._proceedingsModel  = new ProceedingsModel();
        this._initializeElements();
        this._getPageMessages();
        this._getPageContent();

    }

    private _getPageMessages(): void {
        
        this._messageData = this._messageModel.all();

        this._messageData.then(data => {

            data['pt-BR'].forEach(message => {
                
                Object.keys(message).forEach(key => {

                    MessageBuilder.buildMessage(this._elements[(message['id']) ? message['id'] : (message['tag'])], key, message[key]);

                });
            
            });

        })

        .catch(error => Logger.log(error));

    }

    private _initializeElements(): void {

        this._elements = new Array<HTMLElement>();

    }

    private _getPageContent(): void {
        
        this._proceedingsData = this._proceedingsModel.all();

        this._proceedingsData.then(data => {

        })

        .catch(error => Logger.log(error));

    }

}