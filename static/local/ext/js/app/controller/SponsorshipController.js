import { Controller } from './../../core/Controller.js';
import { Logger } from './../../util/Logger.js';
import { MessageModel } from './../model/MessageModel.js';
import { SponsorshipModel } from './../model/SponsorshipModel.js';
import { DataEntity } from '../../conf/Config.js';
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