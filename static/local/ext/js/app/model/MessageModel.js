import { Config } from '../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class MessageModel extends Model {
    constructor(modelName) {
        super();
        super._dataPath = Config.LOCAL_CONF_FILES_PATH.get(modelName);
        super._relativeDataPath = "../../../local/data/messages/dashboard.json";
        super._dataKeys = [];
    }
}
//# sourceMappingURL=MessageModel.js.map