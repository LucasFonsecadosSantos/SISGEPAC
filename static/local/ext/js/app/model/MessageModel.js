import { Config } from '../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class MessageModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.LOCAL_MESSAGES_PATH;
        super._relativeDataPath = "../../../local/data/messages/messages.json";
        super._dataKeys = [];
    }
}
//# sourceMappingURL=MessageModel.js.map