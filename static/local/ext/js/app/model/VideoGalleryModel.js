import { DataEntity, Config } from './../../conf/Config.js';
import { Model } from "./../../core/Model.js";
export class VideoGalleryModel extends Model {
    constructor() {
        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._VIDEO_GALLERY_);
        super._relativeDataPath = "../../../remote/data/content/video_gallery.json";
        super._dataKeys = [];
    }
}
//# sourceMappingURL=VideoGalleryModel.js.map