import { DataEntity,Config }    from './../../conf/Config.js';
import { Model }                from "./../../core/Model.js"

export class PhotoGalleryModel extends Model {

    constructor() {

        super();

        
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._PHOTO_GALLERY_);
        
        super._relativeDataPath = "../../../remote/data/content/photo_gallery.json"
        
        super._dataKeys = [

   
        
        ];

    }

}