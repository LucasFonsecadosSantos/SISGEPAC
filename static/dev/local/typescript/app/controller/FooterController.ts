import { Controller }       from './../../core/Controller.js';
import { MessageModel }     from './../model/MessageModel.js';
import { MessageBuilder }   from './../../util/MessageBuilder.js';
import { DataEntity }       from './../../conf/Config.js';
import { Logger }           from './../../util/Logger.js';

export class FooterController extends Controller {

    private _elements:      Array<HTMLElement>;
    private _messageModel:  MessageModel;
    private _messageData;

    constructor() {

        super();
        this._messageModel = new MessageModel(DataEntity._FOOTER_MESSAGES_);
        this._initializeElements();
        this._getPageMessages();

    }

    private _initializeElements(): void {

        this._elements = new Array<HTMLElement>();

        this._elements['footer-developed-by']   = document.querySelector('#footer-developed-by');
        this._elements['footer-copyright']      = document.querySelector('#footer-copyright');

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


}