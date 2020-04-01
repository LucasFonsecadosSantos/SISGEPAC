var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DataEntity, Config } from './../../conf/Config.js';
import { Model } from "./../../core/Model.js";
import { SpeakerModel } from './SpeakerModel.js';
import { TrackModel } from './TrackModel.js';
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
            'start_date',
            'start_time',
            'end_date',
            'end_time',
            'vacancies',
            'restriction',
            'track_id',
            'offering',
            'location',
            'geo-location',
            'price',
            'show'
        ];
    }
    fetchAllJoin() {
        return __awaiter(this, void 0, void 0, function* () {
            const fetched = yield fetch(this._dataPath)
                .then(response => response.json())
                .then((fetchedArray) => __awaiter(this, void 0, void 0, function* () {
                yield fetchedArray.forEach((data) => __awaiter(this, void 0, void 0, function* () {
                    let speakerModel = new SpeakerModel();
                    let speakerData = speakerModel.filter('id', data['responsible_id']);
                    const k = yield speakerData.then((speaker) => __awaiter(this, void 0, void 0, function* () {
                        Object.assign(data, { 'speaker': speaker });
                        let trackModel = new TrackModel();
                        let trackData = trackModel.filter('id', data['track_id']);
                        const x = yield trackData.then(track => {
                            Object.assign(data, { 'track': track });
                            return data;
                        });
                        return x;
                    }));
                    return k;
                }));
                console.log(yield fetchedArray[0]);
                return fetchedArray;
            }));
            return fetched;
        });
    }
    filterJoin() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=ActivityModel.js.map