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
import { TemplateController } from '../app/controller/TemplateController.js';
import { ProceedingsController } from '../app/controller/ProceedingsController.js';
import { PhotoGalleryController } from './../app/controller/PhotoGalleryController.js';
import { VideoGalleryController } from './../app/controller/VideoGalleryController.js';
import { SpeakerRegisterModalController } from './../app/controller/SpeakerRegisterModalController.js';
import { ActivityRegisterModalController } from './../app/controller/ActivityRegisterModalController.js';
import { Routes } from './../conf/Routes.js';
export class Sisgepac {
    constructor() {
        this._bodyElement = document.querySelector('.app-content');
        this._modalElements = document.querySelectorAll('[sisgepac-modal]');
        this._controllers = new Map([
            ['ProceedingsController', ProceedingsController],
            ['SpeakerController', SpeakerController],
            ['DashboardController', DashboardController],
            ['VideoGalleryController', VideoGalleryController],
            ['PhotoGalleryController', PhotoGalleryController],
            ['TemplateController', TemplateController],
            ['ChangelogController', ChangelogController],
            ['SpeakerRegisterModalController', SpeakerRegisterModalController],
            ['FaqController', FaqController],
            ['ActivityRegisterModalController', ActivityRegisterModalController]
        ]);
        new Monitor();
        new HeaderController();
        new NavbarController();
        new FooterController();
        this._pageProcessor();
        this._routeProcessor();
    }
    _routeProcessor() {
        window.addEventListener('hashchange', event => {
            let url = window.location.hash.replace('#', '');
            let urlTokens = url.split('/');
            let params = "";
            let route;
            if (urlTokens.length > 2) {
                params = urlTokens[1];
                urlTokens[1] = "{id}";
                route = Routes.ROUTES.get(urlTokens[0] + '/' + urlTokens[1] + '/' + urlTokens[2]);
            }
            else if (urlTokens.length === 1) {
                route = Routes.ROUTES.get(urlTokens[0]);
            }
            else if (urlTokens.length === 2) {
                route = Routes.ROUTES.get(urlTokens[0] + '/' + urlTokens[1]);
            }
            let routeTokens = route.split('@');
            let controller = this._controllers.get(routeTokens[0]);
            let action = routeTokens[1];
            if (params !== "") {
                //@ts-ignore
                let controllerInstance = new controller();
                controllerInstance[action](params);
            }
            else {
                //@ts-ignore
                let controllerInstance = new controller();
                controllerInstance[action]();
            }
        });
    }
    _pageProcessor() {
        switch (this._bodyElement.getAttribute('sisgepac-page')) {
            //TODO
            case 'index':
                new DashboardController(true);
                break;
            case 'speaker':
                new SpeakerController(true);
                break;
            case 'sponsorship':
                new SponsorshipController(true);
                break;
            case 'faq':
                new FaqController(true);
                break;
            case 'event':
                new EventSettingsController(true);
                break;
            case 'changelog':
                new ChangelogController(true);
                break;
            case 'template':
                new TemplateController(true);
                break;
            case 'proceedings':
                new ProceedingsController(true);
                break;
            case 'photo-gallery':
                new PhotoGalleryController(true);
                break;
            case 'video-gallery':
                new VideoGalleryController(true);
                break;
        }
        this._modalElements.forEach(modal => {
            switch (modal.getAttribute('sisgepac-modal')) {
                case 'event-settings-modal':
                    new EventSettingsModalController();
                    break;
                case 'speaker-register-modal':
                    new SpeakerRegisterModalController();
                    break;
                case 'activity-register-modal':
                    new ActivityRegisterModalController();
                    break;
            }
        });
    }
}
//# sourceMappingURL=Sisgepac.js.map