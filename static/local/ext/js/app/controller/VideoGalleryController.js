import { Controller } from './../../core/Controller.js';
import { DataEntity } from './../../conf/Config.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { Logger } from './../../util/Logger.js';
import { VideoGalleryModel } from './../../app/model/VideoGalleryModel.js';
import { MessageModel } from './../../app/model/MessageModel.js';
export class VideoGalleryController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._VIDEO_GALLERY_MESSAGES_);
        this._videoGalleryModel = new VideoGalleryModel();
        this._initializeElements();
        this._getPageMessages();
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
        this._elements = new Array();
    }
}
//# sourceMappingURL=VideoGalleryController.js.map