import { DataEntity,Config }    from './../../conf/Config.js';
import { Model }                from "./../../core/Model.js"

export class SponsorshipModel extends Model {

    constructor() {

        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SPONSORSHIP_);
        super._relativeDataPath = "../../../remote/data/content/sponsorship.json"
        super._dataKeys = [
            'id',
            'name',
            'description',
            'avatar',
            'website',
            'email',
            'telephone',
            'social-networks',
            'visible',
            'price',
            'sponsorship_plan_id',
        ];

    }

}