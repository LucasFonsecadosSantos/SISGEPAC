import { DataEntity, Config } from './../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class SpeakerModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SPEAKER_);
        super._relativeDataPath = "../../../remote/data/content/speaker.json";
        super._dataKeys = [
            'name',
            'jobInstitute',
            'description',
            'email',
            'social-networks',
            'avatar',
            'show'
        ];
    }
}
//# sourceMappingURL=SpeakerModel.js.map