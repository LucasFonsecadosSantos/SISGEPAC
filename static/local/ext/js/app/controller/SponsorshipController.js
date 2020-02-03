import { Controller } from './../../core/Controller.js';
import { DataEntity } from './../../conf/Config.js';
import { Logger } from './../../util/Logger.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { MessageModel } from './../model/MessageModel.js';
import { SponsorshipModel } from './../model/SponsorshipModel.js';
export class SponsorshipController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._SPONSORSHIP_MESSAGES_);
        this._sponsorshipModel = new SponsorshipModel();
        this._initializeElements();
        this._getPageMessages();
        this._getPageContent();
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
        this._sponsorshipData = this._sponsorshipModel.all();
        this._sponsorshipData.then(data => {
        })
            .catch(error => Logger.log(error));
    }
}
//# sourceMappingURL=SponsorshipController.js.map