import { Controller }           from './../../core/Controller.js';
import { Logger }               from './../../util/Logger.js';
import { MessageBuilder }       from './../../util/MessageBuilder.js';
import { DataEntity, Config }   from './../../conf/Config.js';
import { MessageModel }         from './../model/MessageModel.js';

export class NavbarController extends Controller {

    private _elements:      Array<HTMLElement>;
    private _messageModel:  MessageModel;
    private _messages;

    constructor() {

        super();
        this._messageModel = new MessageModel(DataEntity._NAVBAR_MESSAGES_);
        this._initializeElements();
        this._getPageMessages();

    }

    private _initializeElements(): void {

        this._elements = new Array<HTMLElement>();

        this._elements['navbar-link-navigator']     =   document.querySelector('#navbar-link-navigator');
        this._elements['navbar-link-home']          =   document.querySelector('#navbar-link-home');
        this._elements['navbar-link-event']         =   document.querySelector('#navbar-link-event');
        this._elements['navbar-link-schedule']      =   document.querySelector('#navbar-link-schedule');
        this._elements['navbar-link-sponsorship']   =   document.querySelector('#navbar-link-sponsorship');
        this._elements['navbar-link-proceedings']   =   document.querySelector('#navbar-link-proceedings');
        this._elements['navbar-link-templates']     =   document.querySelector('#navbar-link-templates');
        this._elements['navbar-link-media-gallery'] =   document.querySelector('#navbar-link-media-gallery');
        this._elements['navbar-link-faq']           =   document.querySelector('#navbar-link-faq');
        this._elements['navbar-link-prices']        =   document.querySelector('#navbar-link-prices');
        this._elements['navbar-link-settings']      =   document.querySelector('#navbar-link-settings');
        this._elements['navbar-about-text']         =   document.querySelector('#navbar-about-text');
        this._elements['navbar-about-button']       =   document.querySelector('#navbar-about-button');
        this._elements['navbar-control-panel']      =   document.querySelector('#navbar-control-panel');
        this._elements['navbar-about-title']        =   document.querySelector('#navbar-about-title');
        this._elements['navbar-logo']               =   document.querySelector('#navbar-logo');
        this._elements['navbar-logo-text']          =   document.querySelector('#navbar-logo-text');

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

}