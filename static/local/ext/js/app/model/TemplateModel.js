import { DataEntity, Config } from './../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class TemplateModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._TEMPLATE_);
        super._relativeDataPath = "../../../remote/data/content/template.json";
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
//# sourceMappingURL=TemplateModel.js.map