import { Controller } from "./../../core/Controller.js";
import { Logger } from "./../../util/Logger.js";
import { Config, DataEntity } from "./../../conf/Config.js";

export class DashboardController extends Controller {

    private _elements: Array<HTMLElement>;
    private _sponsorshipData;
    protected _speakerData;
    private _proceedingsData;
    private _eventData;
    private _organizationData;
    private _languagesData;

    constructor(projectStatus: boolean) {

        super();
        this._initializeElements();
        this._getPageMessages();
        this._getPageContent();
        
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

    private _getPageMessages(): void {
        
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

    private _buildPageMessages(data) {
        

        data['index']['pt-BR'].forEach(message => {

            if (message['id']) {

            } else if (message['tag']){

                this._elements[message['tag']].textContent = message['text'];

            }

        });

    }

    private async _getPageContent() {

        this._sponsorshipData   = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SPONSORSHIP_));
        this._speakerData       = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SPEAKER_));
        this._eventData         = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._EVENT_));
        this._organizationData  = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._ORGANIZATION_));
        this._languagesData     = fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._LANGUAGE_));

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