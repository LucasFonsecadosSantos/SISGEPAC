import { DataEntity, Config } from './../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class SystemConfigModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.REMOTE_CONF_FILES_PATH.get(DataEntity._SYSTEM_);
        super._relativeDataPath = "../../../remote/data/config/system.json";
        super._dataKeys = [
            'project-started',
            'maintence',
            'coming-soon',
            'maintence-days',
            'page-launch-date',
            'page-deactivation-date'
        ];
    }
}
//# sourceMappingURL=SystemConfigModel.js.map