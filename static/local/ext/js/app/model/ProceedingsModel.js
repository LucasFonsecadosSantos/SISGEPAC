import { DataEntity, Config } from './../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class ProceedingsModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._PROCEEDINGS_);
        super._relativeDataPath = "../../../remote/data/content/proceedings.json";
        super._dataKeys = [
            'title',
            'description',
            'email',
            'event-type',
            'institute',
            'schedule-date',
            'social-networks',
            'telephone'
        ];
    }
}
//# sourceMappingURL=ProceedingsModel.js.map