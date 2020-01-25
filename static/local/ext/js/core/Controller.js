import { Changelog } from "./../util/Changelog.js";
import { Config } from "./../conf/Config.js";
export class Controller {
    constructor(projectHasStarted) {
        if (!projectHasStarted && (window.location.href != Config.APPLICATION_HOST + ":" + Config.APPLICATION_PORT + "/local")) {
            window.open('/local', '_self');
        }
    }
    _changelog(data) {
        Changelog.register(data);
    }
}
//# sourceMappingURL=Controller.js.map