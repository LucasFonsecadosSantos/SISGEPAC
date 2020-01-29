import { DataEntity, Config }   from './../conf/Config.js';
import { Logger }               from "./../util/Logger.js";

export class Model {

    protected _dataPath:            string;
    protected _relativeDataPath:    string
    protected _dataKeys:            Array<string>;

    constructor() {
        
    }


    public async all() {

        console.log("heelo")

        const fetched = await fetch(this._dataPath)

                            .then(response => response.json())

                            .then(data => data);

        return fetched;

    }

    public update(data: Object): void {
        
        fetch(this._dataPath)

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

        let error: boolean = false;

        Object.keys(data).forEach(key => {

            if (!this._dataKeys.includes(key)) {
                error = true;
            }

        });

        if (!error) {

            fetch(Config.LOCAL_RECEPTOR_SERVER + "?data=" + encodeURI(JSON.stringify(data)) + "&file=" + this._relativeDataPath, {

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

    public delete(key?: string): void {

        if (key) {

        } else {

        }

    }

    public count(): number {

        var counter: number = 0;

        fetch(this._dataPath)

            .then(response => response.json())

            .then(data => {})

            .catch(error => Logger.log(error));

        return counter;
    }

}