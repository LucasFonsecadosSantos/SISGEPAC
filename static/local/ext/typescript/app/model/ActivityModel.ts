import { DataEntity,Config }    from './../../conf/Config.js';
import { Model }                from "./../../core/Model.js"
import { SpeakerModel }         from './SpeakerModel.js';
import { TrackModel }           from './TrackModel.js';

export class ActivityModel extends Model {

    constructor() {

        super();
        super._dataPath = Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._ACTIVITY_);
        super._relativeDataPath = "../../../remote/data/content/activity.json"
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

    public async fetchAllJoin() {

        const fetched = await fetch(this._dataPath)

        .then(response => response.json())

        .then(async fetchedArray => {


            await fetchedArray.forEach(async data => {

                let speakerModel = new SpeakerModel();
                let speakerData = speakerModel.filter('id', data['responsible_id']);

                const k =  await speakerData.then(async speaker => {
                    
                    Object.assign(data, {'speaker': speaker})

                    let trackModel  = new TrackModel();
                    let trackData   = trackModel.filter('id', data['track_id']);
                    
                    const x = await trackData.then(track => {

                        Object.assign(data, {'track': track});
                        return data;

                    });

                    return x;

                });
                
                return k;

            });
            console.log(await fetchedArray[0])
            return fetchedArray;

        });
        
        return fetched;

    }

    public async filterJoin() {
        
    }

}