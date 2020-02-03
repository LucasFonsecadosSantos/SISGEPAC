import { DataEntity, Config } from './../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class EventModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._EVENT_);
        super._relativeDataPath = "../../../remote/data/content/event.json";
        super._dataKeys = [
            'title',
            'description',
            'mission',
            'area',
            'edition',
            'email',
            'logo',
            'event-type',
            'institute',
            'schedule-date',
            'opening-time',
            'social-networks',
            'address-location',
            'geo-location',
            'latest-events',
            'telephone'
        ];
    }
}
//# sourceMappingURL=EventModel.js.map