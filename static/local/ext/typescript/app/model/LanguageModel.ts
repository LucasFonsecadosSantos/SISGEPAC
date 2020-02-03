import { Model }                from "./../../core/Model.js";
import { DataEntity, Config }   from "./../../conf/Config.js";

export class LanguageModel extends Model {

    constructor() {

        super();
        super._dataPath = Config.REMOTE_CONF_FILES_PATH.get(DataEntity._LANGUAGE_);
        super._relativeDataPath = "../../../remote/data/config/languages.json";
        super._dataKeys = [];

    }

}