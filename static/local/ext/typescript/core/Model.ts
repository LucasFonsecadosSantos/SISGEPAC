import { DataEntity, Config }       from './../conf/Config.js';
import { Logger }                   from "./../util/Logger.js";
import { Helper }                   from './../util/Helper.js';
import { InvalidDataKeyException }  from "./../exception/InvalidDataKeyException.js";

export class Model {

    protected _dataPath:            string;
    protected _relativeDataPath:    string
    protected _dataKeys:            Array<string>;

    constructor() {
        
    }


    public async all() {

        const fetched = await fetch(this._dataPath)

            .then(response => response.json())

            .then(data => data);

        return fetched;

    }

    // public update(params: Object, data: any) {
        
    //     fetch(this._dataPath)

    //         .then(response => response.json())

    //         .then(fetchedData => {
                
    //             if (Array.isArray(fetchedData)) {

    //                 data.forEach((element, index) => {

    //                     if (fetchedData[index]) {

    //                         fetchedData[index] = element;

    //                     } else {

    //                         Logger.log("Data store error. (" + element + ")");

    //                     }

    //                 });

    //                 this.store(fetchedData);

    //             } else {

    //                 Object.keys(data).forEach(key => {
                        
    //                     if (key in fetchedData) {
                            
    //                         fetchedData[key] = data[key];

    //                     } else {

    //                         Logger.log("Data store error. (" + key + ")");

    //                     }

    //                 });

    //                 this.store(fetchedData);

    //             }

    //         })

    //         .catch(error => Logger.log(error));

    // }


    public update(data: any, params?: Object) {
        
        let targetObjects = new Array<Object>();

        fetch(this._dataPath)

            .then(response => response.json())

            .then(fetchedObject => {

                if (Array.isArray(fetchedObject)) {
                    
                    fetchedObject.forEach(storedObject => {

                        Object.keys(storedObject).forEach(key => {

                            if (params[key]) {
                                
                                if (params[key] === storedObject[key]) {
                                    
                                    Object.keys(data).forEach(dataKey => {

                                        storedObject[dataKey] = data[dataKey];

                                    });

                                }

                            }

                        });

                    });

                } else {
                    
                }

                this.store(fetchedObject);

            })

            .catch(error => Logger.log('Error on update:' + error));

    }

    public async store(data: any) {

        let error: boolean = false;
        
        if (Array.isArray(data)) {
            
            //TODO
            
        } else {
            
            Object.keys(data).forEach(key => {

                if (!this._dataKeys.includes(key)) {
                    
                    error = true;

                }

            });

        }

        if (!error) {
            
            fetch(Config.LOCAL_RECEPTOR_SERVER + "?data=" + encodeURI(JSON.stringify(data)) + "&file=" + this._relativeDataPath, {

                method: 'POST',
                headers: {
    
                    'Accept': 'application/json',
                    'Content-type': 'Application/json'
    
                }
    
            });

        } else {

            throw new InvalidDataKeyException("A data key was wrong. The store operation cannot be completed. [MODEL: " + this._dataPath + " / KEYS: "+ this._dataKeys +"]");

        }

    }

    public insert(data: any): void {

        let error: boolean = false;
        
        if (Array.isArray(data)) {

        } else {

            fetch(this._dataPath)

                .then(response => response.json())

                .then(fetchedData => {

                    fetchedData.forEach(element => {

                        //alert(data['id'] + '===' +  element['id']);
                        
                        if (data['id'] === element['id']) {
                            
                            this.update(data);

                        }

                    });

                    if (data['id']) {

                    }

                    Object.keys(data).forEach(key => {

                        if (!this._dataKeys.includes(key)) {
                            
                            error = true;

                        }

                    });

                    if (!error) {
                        
                        fetchedData.push(data);

                        fetch(Config.LOCAL_RECEPTOR_SERVER + "?data=" + encodeURI(JSON.stringify(fetchedData)) + "&file=" + this._relativeDataPath, {

                            method: 'POST',
                            headers: {
                
                                'Accept': 'application/json',
                                'Content-type': 'Application/json'
                
                            }
                        });

                    }

                })

                .catch(error => Logger.log(error));

        }

    }

    public async filter(key: string, value: any) {

        const fetched = await fetch(this._dataPath)

            .then(response => response.json())

            .then(data => {

                var resultObjects: Array<Object> = new Array<Object>();

                if (Array.isArray(data)) {

                    data.forEach(element => {

                        Object.keys(element).forEach(keyElement => {
                            
                            if ((keyElement === key) && (element[keyElement] === value)) {
                    
                                resultObjects.push(element);

                            }

                        });

                    });


                } else {

                    Object.keys(data).forEach(element => {

                        if ((element === key) && (data[element] === value)) {

                            resultObjects.push(data);

                        }

                    });


                }

                return resultObjects;

            })

            .catch(error => Logger.log(error));

        return fetched;

    }

    public delete(key?: string): void {

        if (key) {

        } else {

            fetch(Config.LOCAL_RECEPTOR_SERVER + "?data=" + encodeURI(JSON.stringify("")) + "&file=" + this._relativeDataPath, {

                method: 'POST',
                headers: {
    
                    'Accept': 'application/json',
                    'Content-type': 'Application/json'
    
                }
            });

        }

    }

    public async find(key: string, value: string) {

        const target = await fetch(this._dataPath)

            .then(response => response.json())

            .then(data => {

                if (Array.isArray(data)) {


                    let size = data.length;

                    for (let i = 0 ; i < size; i++) {

                        if (data[i][key] === value) return data[i]; 

                    }
                    // data.forEach(element => {

                    //     if (element[key] == value) return element; 

                    // });

                    return undefined;

                }

            })

            .catch(error => Logger.log(error));

        return target;

    }

    public count(): number {

        var counter: number = 0;

        fetch(this._dataPath)

            .then(response => response.json())

            .then(data => {})

            .catch(error => Logger.log(error));

        return counter;
    }

    public async imageUpload(data: FormData) {

        const fileName = await fetch(Config.LOCAL_IMAGE_RECEPTOR_SERVER, {

            method: 'POST',
            body: data

        })
        
        .then(response => response.json())

        .then(data => data)

        .catch(error => Logger.log(error));

        return fileName;

    }

}