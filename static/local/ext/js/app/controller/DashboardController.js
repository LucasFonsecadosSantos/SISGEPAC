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
import { Config, DataEntity } from "./../../conf/Config.js";
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
        fetch(Config.LOCAL_MESSAGES_PATH)
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
            this._sponsorshipData = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SPONSORSHIP_));
            this._speakerData = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SPEAKER_));
            this._eventData = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._EVENT_));
            this._organizationData = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._ORGANIZATION_));
            this._languagesData = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._LANGUAGE_));
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
    _populateLanguageData() { }
}
//# sourceMappingURL=DashboardController.js.map