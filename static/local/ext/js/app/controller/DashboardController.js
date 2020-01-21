var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Controller } from "./../../core/Controller.js";
import { Logger } from "./../../util/Logger.js";
export class DashboardController extends Controller {
    constructor() {
        super();
        this._initializeElements();
        this._getPageMessages();
        this._getPageContent();
        this._populateLanguageData();
        this._populateEventData();
        this._populateSpeakerData();
        this._populateSponsorshipData();
        this._populateOrganizationData();
    }
    _initializeElements() {
        this._elements = new Array();
        this._elements['title'] = document.querySelector('title');
    }
    _getPageMessages() {
        fetch('/local/data/messages/messages.json')
            .then(response => response.json())
            .then(data => {
            Logger.log("Getting dashboard messages...");
            this._buildPageMessages(data);
        })
            .catch(error => {
            Logger.log(error);
            alert(error);
        });
    }
    _buildPageMessages(data) {
        data['index']['pt-BR'].forEach(message => {
            if (message['id']) {
            }
            else if (message['tag']) {
                this._elements[message['tag']].textContent = message['text'];
            }
        });
    }
    _getPageContent() {
        return __awaiter(this, void 0, void 0, function* () {
            this._sponsorshipData = fetch('/remote/data/content/sponsorship.json');
            this._speakerData = fetch('/remote/data/content/speaker.json');
            this._eventData = fetch('/remote/data/content/event.json');
            this._organizationData = fetch('/remote/data/content/organization.json');
            this._languagesData = fetch('/remote/data/config/languages.json');
        });
    }
    _populateEventData() {
        this._eventData
            .then(response => response.json())
            .then(data => {
        })
            .catch(error => { Logger.log(error); });
    }
    _populateSpeakerData() {
        this._speakerData
            .then(response => response.json())
            .then(data => {
        })
            .catch(error => { Logger.log(error); });
    }
    _populateOrganizationData() {
        this._organizationData
            .then(response => response.json())
            .then(data => {
        })
            .catch(error => { Logger.log(error); });
    }
    _populateSponsorshipData() {
        this._sponsorshipData
            .then(response => response.json())
            .then(data => {
        })
            .catch(error => { Logger.log(error); });
    }
}
//# sourceMappingURL=DashboardController.js.map