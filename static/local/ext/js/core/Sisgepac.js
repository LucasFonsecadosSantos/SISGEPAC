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
            ['FaqController', FaqController]
        ]);
        new Monitor();
        new HeaderController();
        new NavbarController();
        new FooterController();
        this._pageProcessor();
        this._routeProcessor();
    }
    _routeProcessor() {
        let route = window.location.href.replace(/^(?:\/\/|[^/]+)*\//, '').replace('local/', '');
        let routeList = Routes.ROUTES;
        let tokens = routeList.get(route).split('@');
        let controller = this._controllers.get(tokens[0]);
        let action = tokens[(tokens.length - 1)];
        let params;
        if (routeList.get(route).split('@').length == 1) {
            //@ts-ignore
            new controller();
        }
        else if (routeList.get(route).split('@').length == 2) {
            //@ts-ignore
            let controllerInstance = new controller();
            controllerInstance[action]();
        }
        else if (routeList.get(route).split('@').length > 2) {
            //@ts-ignore
            let controllerInstance = new controller();
            params = route.split('/')[1];
            controllerInstance[action](params);
        }
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
            }
        });
    }
}
//# sourceMappingURL=Sisgepac.js.map