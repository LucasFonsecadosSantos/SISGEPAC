import { Controller } from './../../core/Controller.js';
import { DataEntity } from './../../conf/Config.js';
import { Logger } from './../../util/Logger.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { MessageModel } from './../model/MessageModel.js';
import { ChangelogModel } from './../model/ChangelogModel.js';
export class ChangelogController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._CHANGELOG_MESSAGES_);
        this._changelogModel = new ChangelogModel();
        this._initializeElements();
        this._getPageMessages();
        //this._getPageContent();
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
    _initializeElements() {
        // this._textElements      = new Array<HTMLElement>();
        // this._buttonElements    = new Array<HTMLElement>();
        // this._inputElements     = new Array<HTMLElement>();
        // this._changelogContent                          = document.getElementById('changelog-content');
        // this._titleElement                              = document.getElementsByTagName('title')[0];
        // this._textElements['body-title']                = document.getElementById('page-body-title');
    }
}
//# sourceMappingURL=ChangelogController.js.map