import { Model } from './../../core/Model.js';
import { DataEntity, Config } from './../../conf/Config.js';
export class TrackModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._TRACK_);
        super._relativeDataPath = "../../../remote/data/content/track.json";
        super._dataKeys = [
            'id',
            'name',
            'description',
            'value',
            'avatar',
            'legend-color'
        ];
    }
}
//# sourceMappingURL=TrackModel.js.map