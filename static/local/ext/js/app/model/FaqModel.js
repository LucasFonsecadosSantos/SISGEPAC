import { DataEntity, Config } from './../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class FaqModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._FAQ_);
        super._relativeDataPath = "../../../remote/data/content/faq.json";
        super._dataKeys = [
            'id',
            'title',
            'description',
            'answer'
        ];
    }
}
//# sourceMappingURL=FaqModel.js.map