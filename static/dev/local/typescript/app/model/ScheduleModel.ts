import { DataEntity,Config }    from './../../conf/Config.js';
import { Model }                from "./../../core/Model.js"

export class EventModel extends Model {

    constructor() {

        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SCHEDULE_);
        super._relativeDataPath = "../../../remote/data/content/schedule.json"
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