import { Logger } from './Logger.js';
export class Monitor {
    constructor() {
        this._initInterfaceMonitoring();
        this._initServicesMonitoring();
    }
    _initInterfaceMonitoring() {
        window.addEventListener('resize', event => {
            Logger.monitoring('Resize', 'Page resized.', event);
        });
        document.addEventListener('load', event => {
            Logger.monitoring('Load', 'Page loaded.', event);
        });
        document.addEventListener('UiEvent', event => {
            Logger.monitoring('User Event', 'User interaction registered.', event);
        });
        document.addEventListener('PageTransitionEvent', event => {
            Logger.monitoring('PageTransitionEvent', 'Page transition registered.', event);
        });
        document.addEventListener('HashChangeEvent', event => {
            Logger.monitoring('HashChangeEvent', 'The hash has been changed.', event);
        });
    }
    _initServicesMonitoring() {
    }
}
//# sourceMappingURL=Monitor.js.map