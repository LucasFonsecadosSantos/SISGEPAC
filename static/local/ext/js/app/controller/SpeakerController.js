import { Controller } from './../../core/Controller.js';
import { SpeakerModel } from './../model/SpeakerModel.js';
import { MessageModel } from './../model/MessageModel.js';
import { Logger } from './../../util/Logger.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { DataEntity } from './../../conf/Config.js';
export class SpeakerController extends Controller {
    constructor(interfacePage) {
        super();
        this._messageModel = new MessageModel(DataEntity._SPEAKER_MESSAGES_);
        this._speakerModel = new SpeakerModel();
        if (interfacePage) {
            this._initializeElements();
            this._getPageMessages();
        }
    }
    store(param) {
    }
    _initializeElements() {
        this._elements = new Array();
    }
    _getPageMessages() {
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
    _getPageContent() {
        this._speakerData = this._speakerModel.all();
        this._speakerData.then(data => {
        })
            .catch(error => Logger.log(error));
    }
    search(key, value) {
        let speaker = this._speakerModel.find(key, value);
    }
}
//# sourceMappingURL=SpeakerController.js.map