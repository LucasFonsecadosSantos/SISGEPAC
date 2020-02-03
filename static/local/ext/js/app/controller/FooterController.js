import { Controller } from './../../core/Controller.js';
import { MessageModel } from './../model/MessageModel.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { DataEntity } from './../../conf/Config.js';
import { Logger } from './../../util/Logger.js';
export class FooterController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._FOOTER_MESSAGES_);
        this._initializeElements();
        this._getPageMessages();
    }
    _initializeElements() {
        this._elements = new Array();
        this._elements['footer-developed-by'] = document.querySelector('#footer-developed-by');
        this._elements['footer-copyright'] = document.querySelector('#footer-copyright');
    }
    _getPageMessages() {
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
//# sourceMappingURL=FooterController.js.map