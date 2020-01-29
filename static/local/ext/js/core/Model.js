var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Config } from './../conf/Config.js';
import { Logger } from "./../util/Logger.js";
export class Model {
    constructor() {
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("heelo");
            const fetched = yield fetch(this._dataPath)
                .then(response => response.json())
                .then(data => data);
            return fetched;
        });
    }
    update(data) {
        fetch(this._dataPath)
            .then(response => response.json())
            .then(fetchedData => {
            Object.keys(data).forEach(key => {
                if (fetchedData[key]) {
                    fetchedData[key] = data[key];
                }
                else {
                    Logger.log("Data store error. (" + key + ")");
                }
            });
            this.store(fetchedData);
        })
            .catch(error => Logger.log(error));
    }
    store(data) {
        let error = false;
        Object.keys(data).forEach(key => {
            if (!this._dataKeys.includes(key)) {
                error = true;
            }
        });
        if (!error) {
            fetch(Config.LOCAL_RECEPTOR_SERVER + "?data=" + encodeURI(JSON.stringify(data)) + "&file=" + this._relativeDataPath, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'Application/json'
                }
            });
        }
        else {
            //throw exception
        }
    }
    delete(key) {
        if (key) {
        }
        else {
        }
    }
    count() {
        var counter = 0;
        fetch(this._dataPath)
            .then(response => response.json())
            .then(data => { })
            .catch(error => Logger.log(error));
        return counter;
    }
}
//# sourceMappingURL=Model.js.map