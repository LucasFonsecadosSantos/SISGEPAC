import { Controller }           from './../../core/Controller.js';
import { DataEntity, Config }   from './../../conf/Config.js';
import { Logger }               from './../../util/Logger.js';

export class EventSettingsModalController extends Controller {

    private _elements: Array<HTMLElement>;
    private _messages;

    constructor() {

        super();
        this._initializeElements();
        this._getData();
        this._getPageMessages();

    }

    private _initializeElements(): void {

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

        

    }

    private _getData(): void {

        this._messages = fetch(Config.LOCAL_MESSAGES_PATH);

    }

    private _getPageMessages(): void {

        this._messages

            .then(response => response.json())

            .then(data => {
                
                data['event-settings-modal']['pt-BR'].forEach(message => {

                    if (message['text']) {

                        this._elements[message['id']].textContent = message['text'];

                    }

                    if (message['icon']) {

                        this._elements[message['id']].textContent = message['icon'];

                    }

                    if (message['alt']) {

                        this._elements[message['id']].setAttribute('alt', message['alt']);

                    }

                    if (message['title']) {

                        this._elements[message['id']].setAttribute('title', message['title']);

                    }

                    if (message['placeholder']) {

                        this._elements[message['id']].setAttribute('placeholder', message['placeholder']);

                    }

                    if (message['route']) {

                        this._elements[message['id']].setAttribute('href', message['route']);

                    }

                });

            })

            .catch(error => Logger.log(error));

    }

}