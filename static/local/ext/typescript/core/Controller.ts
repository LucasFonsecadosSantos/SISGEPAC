import { Changelog } from "./../util/Changelog.js";

export class Controller {
    
    protected APPLICATION_HOST;

    constructor() {

        //this.APPLICATION_HOST = ConfService.getApplicationConf().then(res => this.APPLICATION_HOST = res);
        //console.log(this.APPLICATION_HOST['APPLICATION_HOST'])
    }

    protected _changelog(data: string): void {
        
        Changelog.register(data);

    }
}