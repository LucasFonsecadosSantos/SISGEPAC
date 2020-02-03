var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Controller } from "./../../core/Controller.js";
import { DataEntity, Config } from './../../conf/Config.js';
export class SystemController extends Controller {
    constructor() {
        super();
        this._getData();
    }
    _getData() {
        this._systemData = fetch(Config.REMOTE_CONF_FILES_PATH.get(DataEntity._SYSTEM_));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch(Config.REMOTE_CONF_FILES_PATH.get(DataEntity._SYSTEM_));
        });
    }
}
//# sourceMappingURL=SystemController.js.map