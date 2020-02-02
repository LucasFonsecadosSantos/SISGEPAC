import { Controller }           from "./../../core/Controller.js";
import { Logger }               from "./../../util/Logger.js";
import { Config, DataEntity }   from "./../../conf/Config.js";
import { MessageModel }         from '../model/MessageModel.js';
import { EventModel }           from './../model/EventModel.js';
import { SpeakerModel }         from "./../model/SpeakerModel.js";
import { LanguageModel }        from "./../model/LanguageModel.js";

export class DashboardController extends Controller {

    private _elements:          Array<HTMLElement>;
    private _sponsorshipData;
    private _speakerModel:      SpeakerModel;
    private _speakerData;
    private _eventModel:        EventModel;
    private _eventData;
    private _messagesModel:     MessageModel;
    private _messagesData;
    // private _proceedingsModel:  ProceedingsModel;
    // private _proceedingsData;
    // private _organizerModel:    OrganizerModel;
    // private _organizerData;
    private _languageModel:     LanguageModel;
    private _languageData;

    constructor() {

        super();
        this._messagesModel = new MessageModel(DataEntity._DASHBOARD_MESSAGES_);
        this._eventModel    = new EventModel();
        this._languageModel = new LanguageModel();
        this._speakerModel  = new SpeakerModel();
        this._initializeElements();
        this._getPageMessages();
        
        //TODO HERE
        if (true) {

            //@ts-ignore
            $('#eventSettingsModal').modal('show');
            

        } else {
         
            this._populateLanguageData();
            this._populateEventData();
            this._populateSpeakerData();
            // this._populateSponsorshipData();
            // this._populateOrganizationData();

        }

    }

    private _initializeElements(): void {

        this._elements = new Array<HTMLElement>();

        this._elements['title'] = document.querySelector('title');
        
    }

    private _getPageMessages(): void {

        this._messagesData  = this._messagesModel.all();

        this._messagesData.then(data => {

        })

        .catch(error => Logger.log(error));

    }

    private _populateLanguageData(): void {

        this._languageData = this._languageModel.filter('using', true);

        this._languageData.then(data => console.log(data));

    }

    private _populateEventData(): void {

        this._eventData = this._eventModel.all();

        this._eventData

            .then(data => {

                

            })
            
            .catch(error => {Logger.log(error)});

    }
    
    private _populateSpeakerData(): void {

        this._speakerData = this._speakerModel.all();

        this._speakerData

            .then(data => {

            })

            .catch(error => {Logger.log(error)});

    }

    // private _populateOrganizationData(): void {

    //     this._organizerData = this._organizerModel.all();

    //     this._organizerData

    //         .then(data => {

    //         })

    //         .catch(error => {Logger.log(error)});

    // }

    // private _populateSponsorshipData(): void {

    //     this._sponsorshipData = this._sponsorshipModel.all();

    //     this._sponsorshipData

    //         .then(data => {

    //         })

    //         .catch(error => {Logger.log(error)});

    // }

}