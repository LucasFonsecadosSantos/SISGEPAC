import { Controller } from './../../core/Controller.js';
import { Logger } from './../../util/Logger.js';
import { DataEntity } from './../../conf/Config.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { MessageModel } from './../model/MessageModel.js';
import { TemplateModel } from './../model/TemplateModel.js';
export class TemplateController extends Controller {
    constructor(interfacePage) {
        super();
        this._messageModel = new MessageModel(DataEntity._TEMPLATE_MESSAGES_);
        this._templateModel = new TemplateModel();
        if (interfacePage) {
            this._initializeElements();
            this._getPageMessages();
            this._getPageContent();
        }
    }
    _initializeElements() {
        this._elements = new Array();
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
    _getPageContent() {
        this._templateData = this._templateModel.all();
        this._templateData.then(data => {
        })
            .catch(error => Logger.log(error));
    }
}
//# sourceMappingURL=TemplateController.js.map