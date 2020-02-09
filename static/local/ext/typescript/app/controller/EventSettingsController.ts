import { Controller }           from './../../core/Controller.js';
import { DataEntity, Config }   from './../../conf/Config.js';
import { MessageModel }         from './../model/MessageModel.js';
import { EventModel }           from './../model/EventModel.js';
import { Logger }               from './../../util/Logger.js';
import { MessageBuilder }       from './../../util/MessageBuilder.js';


export class EventSettingsController extends Controller {

    private _elements:      Array<HTMLElement>;
    private _messageModel:  MessageModel;
    private _eventModel:    EventModel;
    private _messages;
    private _eventData;

    constructor(interfacePage?: boolean) {

        super();
        this._messageModel  = new MessageModel(DataEntity._EVENT_SETTINGS_MESSAGE_);
        this._eventModel    = new EventModel();
        
        if (interfacePage) {
            this._initializeElements();
            this._getPageMessages();
            this._populateContent();
        }

    }

    private _initializeElements(): void {

        this._elements = new Array<HTMLElement>();
        

        this._elements['page-title']                = document.querySelector('#page-title');
        this._elements['route-navigation']          = document.querySelector('#route-navigation');
        this._elements['title']                     = document.querySelector('#event-name');
        this._elements['event-title']               = document.querySelector('#event-title');
        this._elements['event-institute']           = document.querySelector('#event-institute');
        this._elements['event-email']               = document.querySelector('#event-email');
        this._elements['event-site']                = document.querySelector('#event-site');
        this._elements['event-label-website']       = document.querySelector('#event-label-website');
        this._elements['event-label-email']         = document.querySelector('#event-label-email');
        this._elements['event-label-institute']     = document.querySelector('#event-label-institute');
        this._elements['event-label-title']         = document.querySelector('#event-label-title');

    }

    private _getPageMessages(): void {
        
        this._messages = this._messageModel.all();

        this._messages.then(data => {

            data['pt-BR'].forEach(message => {

                Object.keys(message).forEach(key => {

                    MessageBuilder.buildMessage(this._elements[(message['id']) ? message['id'] : (message['tag'])], key, message[key]);

                });
            
            });

        })

        .catch(error => Logger.log(error));

    }

    private _populateContent(): void {


        this._eventData = this._eventModel.all();

        this._eventData.then(data => {

            this._populateCard_01(data);
            this._populateCard_02(data);


        })

        .catch(error => Logger.log(error));

    }


    private _populateCard_01(data): void {

        this._elements['title'].textContent = data['title'];

    }

    private _populateCard_02(data): void {

        this._elements['event-title'].textContent       = data['title'];
        this._elements['event-institute'].textContent   = ((data['institute'] === "")   || (!data['institute'])   ? "Não informado." : data['institute']);
        this._elements['event-email'].textContent       = ((data['email'] === "")       || (!data['email'])       ? "Não informado." : data['email']);
        this._elements['event-site'].textContent        = ((data['website'] === "")     || (!data['website'])     ? "Não informado." : data['website']);
    }

}