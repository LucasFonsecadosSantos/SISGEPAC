import { Changelog } from "./../util/Changelog.js";
export class Controller {
    constructor() {
        //this.APPLICATION_HOST = ConfService.getApplicationConf().then(res => this.APPLICATION_HOST = res);
        //console.log(this.APPLICATION_HOST['APPLICATION_HOST'])
    }
    _changelog(data) {
        Changelog.register(data);
    }
}
//# sourceMappingURL=Controller.js.map