import { DataEntity, Config } from './../../conf/Config.js';
import { Logger } from "./../../util/Logger.js";
export class SystemConfigModel {
    constructor() { }
    update(data) {
        fetch(Config.REMOTE_CONF_FILES_PATH.get(DataEntity._SYSTEM_))
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
        let keysArray = [
            'project-started',
            'maintence',
            'coming-soon',
            'maintence-days',
            'page-launch-date',
            'page-deactivation-date'
        ];
        let error = false;
        Object.keys(data).forEach(key => {
            if (!keysArray.includes(key)) {
                error = true;
            }
        });
        if (!error) {
            fetch(Config.LOCAL_RECEPTOR_SERVER + "?data=" + encodeURI(JSON.stringify(data)) + "&file=" + "../../../remote/data/config/system.json", {
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
}
//# sourceMappingURL=SystemConfigModel.js.map