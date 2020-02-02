import { Controller }           from "./../../core/Controller.js";
import { DataEntity, Config }   from './../../conf/Config.js';
import { MessageModel }         from "./../model/MessageModel.js";
import { EventModel }           from "./../model/EventModel.js";
import { Logger }               from "./../../util/Logger.js";

export class EventSettingsController extends Controller {

    private _elements:      Array<HTMLElement>;
    private _messageModel:  MessageModel;
    private _eventModel:    EventModel;
    private _messages;
    private _eventData;

    constructor() {

        super();
        this._messageModel  = new MessageModel(DataEntity._EVENT_SETTINGS_MESSAGE_);
        this._eventModel    = new EventModel();
        this._initializeElements();
        this._getPageMessages();
        this._populateContent();

    }

    private _initializeElements(): void {

        this._elements = new Array<HTMLElement>();
        

        this._elements['title'] = document.querySelector('title');
        this._elements['page-title'] = document.querySelector('#page-title')

    }

    private _getPageMessages(): void {
        
        this._messages = this._messageModel.all();

        this._messages.then(data => {

        })

        .catch(error => Logger.log(error));

    }

    private _populateContent(): void {


        this._eventData = this._eventModel.all();

        this._eventData.then(data => {

        })

        .catch(error => Logger.log(error));

    }


}