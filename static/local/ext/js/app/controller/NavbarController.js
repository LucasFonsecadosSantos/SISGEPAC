import { Controller } from "./../../core/Controller.js";
import { Logger } from "./../../util/Logger.js";
import { DataEntity } from "./../../conf/Config.js";
import { MessageModel } from "./../model/MessageModel.js";
export class NavbarController extends Controller {
    constructor() {
        super();
        this._messageModel = new MessageModel(DataEntity._NAVBAR_MESSAGES_);
        this._initializeElements();
        this._getPageMessages();
    }
    _initializeElements() {
        this._elements = new Array();
        this._elements['navbar-link-navigator'] = document.querySelector('#navbar-link-navigator');
        this._elements['navbar-link-home'] = document.querySelector('#navbar-link-home');
        this._elements['navbar-link-event'] = document.querySelector('#navbar-link-event');
        this._elements['navbar-link-schedule'] = document.querySelector('#navbar-link-schedule');
        this._elements['navbar-link-sponsorship'] = document.querySelector('#navbar-link-sponsorship');
        this._elements['navbar-link-proceedings'] = document.querySelector('#navbar-link-proceedings');
        this._elements['navbar-link-templates'] = document.querySelector('#navbar-link-templates');
        this._elements['navbar-link-media-gallery'] = document.querySelector('#navbar-link-media-gallery');
        this._elements['navbar-link-faq'] = document.querySelector('#navbar-link-faq');
        this._elements['navbar-link-prices'] = document.querySelector('#navbar-link-prices');
        this._elements['navbar-link-settings'] = document.querySelector('#navbar-link-settings');
        this._elements['navbar-about-text'] = document.querySelector('#navbar-about-text');
        this._elements['navbar-about-button'] = document.querySelector('#navbar-about-button');
        this._elements['navbar-control-panel'] = document.querySelector('#navbar-control-panel');
        this._elements['navbar-about-title'] = document.querySelector('#navbar-about-title');
        this._elements['navbar-logo'] = document.querySelector('#navbar-logo');
        this._elements['navbar-logo-text'] = document.querySelector('#navbar-logo-text');
    }
    _getPageMessages() {
        this._messages = this._messageModel.all();
        this._messages.then(data => {
            data['pt-BR'].forEach(element => {
                if (element['icon']) {
                    if (element['id'] != 'navbar-link-navigator') {
                        this._elements[element['id']].querySelector('.material-icons').textContent = element['icon'];
                    }
                }
                if (element['img']) {
                    this._elements[element['id']].setAttribute('src', element['img']);
                }
                if (element['text']) {
                    if (element['id'] == 'navbar-link-navigator' ||
                        element['id'] == 'navbar-about-text' ||
                        element['id'] == 'navbar-control-panel' ||
                        element['id'] == 'navbar-about-title' ||
                        element['id'] == 'navbar-logo-text' ||
                        element['id'] == 'navbar-about-button') {
                        this._elements[element['id']].textContent = element['text'];
                    }
                    else {
                        this._elements[element['id']].querySelector('p').textContent = element['text'];
                    }
                }
                if (element['route']) {
                    this._elements[element['id']].setAttribute('href', element['route']);
                }
                if (element['alt']) {
                    this._elements[element['id']].setAttribute('alt', element['alt']);
                }
                if (element['title']) {
                    this._elements[element['id']].setAttribute('title', element['title']);
                }
            });
        })
            .catch(error => Logger.log(error));
    }
}
//# sourceMappingURL=NavbarController.js.map