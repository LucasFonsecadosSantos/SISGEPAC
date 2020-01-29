import { Controller } from "./../../core/Controller.js";
import { Logger } from "./../../util/Logger.js";
import { Config, DataEntity } from "./../../conf/Config.js";
import { MessageModel } from '../model/MessageModel.js';
import { EventModel } from './../model/EventModel.js';

export class DashboardController extends Controller {

    private _elements: Array<HTMLElement>;
    private _sponsorshipData;
    protected _speakerData;
    private _eventModel:    EventModel;
    private _messagesModel: MessageModel;
    private _proceedingsData;
    private _eventData;
    private _organizationData;
    private _languagesData;
    private _messagesData;

    constructor(projectStatus: boolean) {

        super();
        this._messagesModel = new MessageModel();
        this._eventModel    = new EventModel();
        this._initializeElements();
        this._getData();
        
        if (!projectStatus) {

            //@ts-ignore
            $('#eventSettingsModal').modal('show');
            

        } else {
         
            this._populateLanguageData();
            this._populateEventData();
            this._populateSpeakerData();
            this._populateSponsorshipData();
            this._populateOrganizationData();

        }

    }

    private _initializeElements(): void {

        this._elements = new Array<HTMLElement>();

        this._elements['title'] = document.querySelector('title');
        
    }

    private _getData(): void {

        this._messagesData      = this._messagesModel.all();
        this._sponsorshipData   = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SPONSORSHIP_));
        this._speakerData       = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SPEAKER_));
        this._eventData         = this._eventModel.all();
        this._organizationData  = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._ORGANIZATION_));
        this._languagesData     = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._LANGUAGE_));

    }

    private _buildPageMessages(data) {
        

        data['index']['pt-BR'].forEach(message => {

            if (message['id']) {

            } else if (message['tag']){

                this._elements[message['tag']].textContent = message['text'];

            }

        });

    }


    private _populateEventData(): void {

        this._eventData
            
            .then(response => response.json())

            .then(data => {

                

            })
            
            .catch(error => {Logger.log(error)});

    }
    
    private _populateSpeakerData(): void {

        this._speakerData

            .then(response => response.json())

            .then(data => {

            })

            .catch(error => {Logger.log(error)});

    }

    private _populateOrganizationData(): void {

        this._organizationData

            .then(response => response.json())

            .then(data => {

            })

            .catch(error => {Logger.log(error)});

    }

    private _populateSponsorshipData(): void {

        this._sponsorshipData

            .then(response => response.json())

            .then(data => {

            })

            .catch(error => {Logger.log(error)});

    }

    private _populateLanguageData(): void {}

}