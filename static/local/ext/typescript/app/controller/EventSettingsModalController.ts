import { Controller }               from './../../core/Controller.js';
import { Logger }                   from './../../util/Logger.js';
import { EventModel }               from './../model/EventModel.js';
import { SystemConfigModel }        from './../model/SystemConfigModel.js';
import { MessageModel }             from './../model/MessageModel.js';
import { InvalidDataKeyException }  from '../../exception/InvalidDataKeyException.js';
import { DataEntity }               from './../../conf/Config.js';
import { MessageBuilder }           from './../../util/MessageBuilder.js';

export class EventSettingsModalController extends Controller {

    private _elements:          Array<HTMLElement>;
    private _messages;
    private _systemConfigModel: SystemConfigModel;
    private _messageModel:      MessageModel;
    private _eventModel:        EventModel;

    constructor() {

        super();
        this._eventModel        = new EventModel();
        this._systemConfigModel = new SystemConfigModel();
        this._messageModel      = new MessageModel(DataEntity._DASHBOARD_EVENT_SETTINGS_MODAL_MESSAGES_);
        this._initElements();
        this._getPageMessages();
        this._initListeners();

    }

    private _initElements(): void {

        this._elements = new Array<HTMLElement>();

        this._elements['event-settings-input-name']         = document.querySelector('#event-settings-input-name');
        this._elements['event-settings-label-name']         = document.querySelector('#event-settings-label-name');
        this._elements['event-settings-input-edition']      = document.querySelector('#event-settings-input-edition');
        this._elements['event-settings-label-edition']      = document.querySelector('#event-settings-label-edition');
        this._elements['event-settings-input-description']  = document.querySelector('#event-settings-input-description');
        this._elements['event-settings-label-description']  = document.querySelector('#event-settings-label-description');
        this._elements['event-settings-input-institute']    = document.querySelector('#event-settings-input-institute');
        this._elements['event-settings-label-institute']    = document.querySelector('#event-settings-label-institute');
        this._elements['event-settings-input-startDate']    = document.querySelector('#event-settings-input-startDate');
        this._elements['event-settings-label-startDate']    = document.querySelector('#event-settings-label-startDate');
        this._elements['event-settings-input-endDate']      = document.querySelector('#event-settings-input-endDate');
        this._elements['event-settings-label-endDate']      = document.querySelector('#event-settings-label-endDate');
        this._elements['event-settings-title']              = document.querySelector('#event-settings-title');
        this._elements['event-settings-modal-add-button']   = document.querySelector('#event-settings-modal-add-button');


    }


    private _getPageMessages(): void {

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

    private _initListeners(): void {

        this._elements['event-settings-modal-add-button'].addEventListener('click', event => {

            try {
            
                this._eventModel.store({

                    "title":        this._elements['event-settings-input-name'].value,
                    "description":  this._elements['event-settings-input-description'].value,
                    "institute":    this._elements['event-settings-input-institute'].value,
                    "schedule-date": [

                        this._elements['event-settings-input-startDate'].value,
                        this._elements['event-settings-input-endDate'].value,

                    ]

                });

                this._systemConfigModel.update({

                    "project-started": true

                });

                super._changelog("Informações básicas do evento configuradas.");
            
            } catch (exception) {

                if (exception instanceof InvalidDataKeyException) {

                    Logger.log("Update Exception: " + exception.message);

                }

            }

            //@ts-ignore
            $('#speakerRegisterModal').modal('hide');

        });

    }

}