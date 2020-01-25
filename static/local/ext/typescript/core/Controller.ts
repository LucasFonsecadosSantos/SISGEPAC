import { Changelog }    from "./../util/Changelog.js";
import { Config }       from "./../conf/Config.js";

export class Controller {
    
    protected APPLICATION_HOST;

    constructor(projectHasStarted?: boolean) {

        if (!projectHasStarted && (window.location.href != Config.APPLICATION_HOST + ":" + Config.APPLICATION_PORT + "/local")) {

            window.open('/local', '_self');

        }

    }

    protected _changelog(data: string): void {
        
        Changelog.register(data);

    }
}