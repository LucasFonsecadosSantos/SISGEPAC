import { DataEntity, Config } from './../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class ActivityModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._ACTIVITY_);
        super._relativeDataPath = "../../../remote/data/content/activity.json";
        super._dataKeys = [
            'id',
            'title',
            'responsible_id',
            'avatar',
            'description',
            'start_dateTime',
            'end_dateTime',
            'vacancies',
            'restriction',
            'track_id',
            'offering',
            'location',
            'geo-location',
            'price'
        ];
    }
}
//# sourceMappingURL=ActivityModel.js.map