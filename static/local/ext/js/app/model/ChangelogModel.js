import { DataEntity, Config } from './../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class ChangelogModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.LOCAL_CONF_FILES_PATH.get(DataEntity._CHANGELOG_);
        super._relativeDataPath = "../../../local/data/conf/changelog.json";
        super._dataKeys = [
            "id",
            "author",
            "date",
            "changes",
            "type"
        ];
    }
}
//# sourceMappingURL=ChangelogModel.js.map