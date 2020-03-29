import { Controller }           from './../../core/Controller.js';
import { Config, DataEntity }   from './../../conf/Config.js';
import { MessageBuilder }       from './../../util/MessageBuilder.js';
import { Logger }               from './../../util/Logger.js';
import { PhotoGalleryModel }    from './../../app/model/PhotoGalleryModel.js';
import { MessageModel }         from './../../app/model/MessageModel.js';

export class PhotoGalleryController extends Controller {

    private _elements:          Array<HTMLElement>;
    private _messageModel:      MessageModel;
    private _photoGalleryModel: PhotoGalleryModel;
    private _photoGalleryData;
    private _messageData;

    constructor(interfacePage?: boolean) {

        super();
        this._messageModel      = new MessageModel(DataEntity._PHOTO_GALLERY_MESSAGES_);
        this._photoGalleryModel = new PhotoGalleryModel();
        
        if (interfacePage) {
            this._initializeElements();
            this._getPageMessages();
        }

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