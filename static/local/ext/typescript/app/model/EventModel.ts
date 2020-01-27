import { DataEntity,Config }    from './../../conf/Config.js';
import { Logger }               from './../../util/Logger.js';

export class EventModel {

    constructor() {

    }

    public update(data: Object): void {

        fetch(Config.REMOTE_CONTENT_FILES_PATH.get(DataEntity._EVENT_))

            .then(response => response.json())

            .then(fetchedData => {

                Object.keys(data).forEach(key => {

                    if (fetchedData[key]) {

                        fetchedData[key] = data[key];

                    } else {

                        Logger.log("Data store error. (" + key + ")");

                    }

                });

                this.store(fetchedData);

            })

            .catch(error => Logger.log(error));

    }

    public store(data: Object): void {

        let keysArray = [
            'title',
            'description',
            'email',
            'event-type',
            'institute',
            'schedule-date',
            'social-networks',
            'telephone'
        ];

        let error: boolean = false;

        Object.keys(data).forEach(key => {

            if (!keysArray.includes(key)) {
                error = true;
            }

        });

        if (!error) {

            fetch(Config.LOCAL_RECEPTOR_SERVER + "?data=" + encodeURI(JSON.stringify(data)) + "&file=" + "../../../remote/data/content/event.json", {

                method: 'POST',
                headers: {
    
                    'Accept': 'application/json',
                    'Content-type': 'Application/json'
    
                }
    
            });

        } else {

            //throw exception

        }

    }

}