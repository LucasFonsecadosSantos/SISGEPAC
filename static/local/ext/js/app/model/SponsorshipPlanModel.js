import { DataEntity, Config } from './../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class SponsorshipPlanModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._SPONSORSHIP_PLAN_);
        super._relativeDataPath = "../../../remote/data/content/sponsorship-plan.json";
        super._dataKeys = [
            'id',
            'name',
            'description',
            'avatar',
            'price'
        ];
    }
}
//# sourceMappingURL=SponsorshipPlanModel.js.map