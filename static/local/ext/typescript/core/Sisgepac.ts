import { EventSettingsController }  from "./../app/controller/EventSettingsController.js";
import { FaqController }  from "./../app/controller/FaqController.js";
import { SponsorshipController }  from "./../app/controller/SponsorshipController.js";
import { SpekaerController }  from "./../app/controller/SpeakerController.js";
import { DashboardController }  from "./../app/controller/DashboardController.js";
import { ChangelogController }  from "./../app/controller/ChangelogController.js";


export class Sisgepac {

    private _bodyElement: HTMLDivElement;

    constructor() {
        
        this._bodyElement = <HTMLDivElement> document.getElementById('main');
        new HeaderController();
        new FooterController();
        this._initializeControllers();
    
    }

    private _initializeControllers(): void {

        switch (this._bodyElement.getAttribute('sisgepac-page')) {

            //TODO
            case 'index':
                new DashboardController();
                break;
            
            case 'speaker':
                new SpeakerController();
                break;
            
            case 'sponsorship':
                new SponsorshipController();
                break;

            case 'faq':
                new FaqController();
                break;
            
            case 'eventSettings':
                new EventSettingsController();
                break;
            

        }

    }

}