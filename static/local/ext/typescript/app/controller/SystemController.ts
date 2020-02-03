import { Controller }           from "./../../core/Controller.js";
import { DataEntity, Config }   from './../../conf/Config.js';
import { Logger }               from "./../../util/Logger.js";

export class SystemController extends Controller {

    private _systemData;
    private _hasStarted: boolean;

    constructor() {

        super();
        this._getData();

    }

    private _getData(): void {

        this._systemData = fetch(Config.REMOTE_CONF_FILES_PATH.get(DataEntity._SYSTEM_));

    }

    public async init() {

        return fetch(Config.REMOTE_CONF_FILES_PATH.get(DataEntity._SYSTEM_));

    }

}