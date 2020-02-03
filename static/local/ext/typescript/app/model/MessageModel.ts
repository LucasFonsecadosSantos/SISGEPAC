import { DataEntity, Config } from '../../conf/Config.js';
import { Model } from "./../../core/Model.js";


export class MessageModel extends Model {

    constructor(modelName: DataEntity) {

        super();
        super._dataPath = Config.LOCAL_CONF_FILES_PATH.get(modelName);
        super._relativeDataPath = "../../../local/data/messages/dashboard.json";
        super._dataKeys = [];

    }

    

}