import { Monitor } from './../util/Monitor.js';
import { EventSettingsController } from './../app/controller/EventSettingsController.js';
import { FaqController } from './../app/controller/FaqController.js';
import { SponsorshipController } from './../app/controller/SponsorshipController.js';
import { SpeakerController } from './../app/controller/SpeakerController.js';
import { DashboardController } from './../app/controller/DashboardController.js';
import { ChangelogController } from './../app/controller/ChangelogController.js';
import { HeaderController } from './../app/controller/HeaderController.js';
import { FooterController } from './../app/controller/FooterController.js';
import { NavbarController } from './../app/controller/NavbarController.js';
import { EventSettingsModalController } from './../app/controller/EventSettingsModalController.js';
export class Sisgepac {
    constructor() {
        this._bodyElement = document.querySelector('.app-content');
        this._modalElements = document.querySelectorAll('[sisgepac-modal]');
        new Monitor();
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
            case 'changelog':
                new ChangelogController();
                break;
        }
        this._modalElements.forEach(modal => {
            switch (modal.getAttribute('sisgepac-modal')) {
                case 'event-settings-modal':
                    new EventSettingsModalController();
                    break;
            }
        });
    }
}
//# sourceMappingURL=Sisgepac.js.map