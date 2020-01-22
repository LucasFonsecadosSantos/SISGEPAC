import { EventSettingsController } from "./../app/controller/EventSettingsController.js";
import { FaqController } from "./../app/controller/FaqController.js";
import { SponsorshipController } from "./../app/controller/SponsorshipController.js";
import { SpeakerController } from "./../app/controller/SpeakerController.js";
import { DashboardController } from "./../app/controller/DashboardController.js";
import { HeaderController } from "./../app/controller/HeaderController.js";
import { FooterController } from "./../app/controller/FooterController.js";
import { NavbarController } from "./../app/controller/NavbarController.js";
export class Sisgepac {
    constructor() {
        this._bodyElement = document.querySelector('.app-content');
        new HeaderController();
        new NavbarController();
        new FooterController();
        this._initializeControllers();
    }
    _initializeControllers() {
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
            case 'event':
                new EventSettingsController();
                break;
        }
    }
}
//# sourceMappingURL=Sisgepac.js.map