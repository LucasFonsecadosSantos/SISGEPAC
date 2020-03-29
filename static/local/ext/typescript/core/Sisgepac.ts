import { Monitor }                          from './../util/Monitor.js';
import { EventSettingsController }          from './../app/controller/EventSettingsController.js';
import { DashboardController }              from './../app/controller/DashboardController.js';
import { ChangelogController }              from './../app/controller/ChangelogController.js';
import { HeaderController }                 from './../app/controller/HeaderController.js';
import { FooterController }                 from './../app/controller/FooterController.js';
import { NavbarController }                 from './../app/controller/NavbarController.js';
import { SystemController }                 from './../app/controller/SystemController.js';
import { EventSettingsModalController }     from './../app/controller/EventSettingsModalController.js';
import { SpeakerRegisterModalController}    from './../app/controller/SpeakerRegisterModalController.js';
import { ActivityRegisterModalController }  from './../app/controller/ActivityRegisterModalController.js';
import { SponsorshipPlanModalController }  from './../app/controller/SponsorshipPlanModalController.js';

import { Routes } from './../conf/Routes.js';


export class Sisgepac {

    private _bodyElement:       HTMLDivElement;
    private _controllers:       Map<string, Object>;
    private _modalElements;

    constructor() {
        
        this._bodyElement       = <HTMLDivElement> document.querySelector('.app-content');
        this._modalElements     = document.querySelectorAll('[sisgepac-modal]');
        
        window.location.hash = "";
        
        this._controllers       = new Map<string, Object>([

            ['DashboardController',             DashboardController],
            ['ChangelogController',             ChangelogController],
            ['SpeakerRegisterModalController',  SpeakerRegisterModalController],
            ['ActivityRegisterModalController', ActivityRegisterModalController],
            ['SponsorshipPlanModalController',  SponsorshipPlanModalController]

        ]);
        
        new Monitor();
        new HeaderController();
        new NavbarController();
        new FooterController();
        this._pageProcessor();
        this._routeProcessor();
        
    }

    private _routeProcessor(): void {

        window.addEventListener('hashchange', event => {

            let url = window.location.hash.replace('#','');

            if (url !== '') {
                let urlTokens = url.split('/');
                let params = "";
                let route;

                if (urlTokens.length > 2) {

                    params = urlTokens[1];
                    urlTokens[1] = "{id}";
                    route = Routes.ROUTES.get(urlTokens[0] + '/' + urlTokens[1] + '/' + urlTokens[2]);

                } else if (urlTokens.length === 1) {

                    route = Routes.ROUTES.get(urlTokens[0]);

                } else if (urlTokens.length === 2) {
                    
                    route = Routes.ROUTES.get(urlTokens[0] + '/' + urlTokens[1]);

                }
                
                
                let routeTokens = route.split('@');

                let controller: Object = this._controllers.get(routeTokens[0]);

                let action = routeTokens[1];

                if (params !== "") {

                    //@ts-ignore
                    let controllerInstance = new controller();
                    controllerInstance[action](params);

                } else {
                    //@ts-ignore
                    let controllerInstance = new controller();
                    controllerInstance[action]();
                }
            }
        });

    }

    private _pageProcessor(): void {
        
        switch (this._bodyElement.getAttribute('sisgepac-page')) {

            case 'index':
                new DashboardController(true);
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
                
                case 'sponsorship-plan-modal':
                    new SponsorshipPlanModalController();
                    break;
    
            }

        });

    }

}