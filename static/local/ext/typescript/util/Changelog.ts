import { DataEntity, Config }   from './../conf/Config.js';
import { Logger }               from "./Logger.js";
import { DateHandler }          from './DateHandler.js';
import { ChangelogSerializer }  from "./../serializer/ChangelogSerializer.js";
import { Identificator }        from './Indentifiator.js';

export class Changelog {


    public static register(changeData: string) {

        fetch(Config.LOCAL_CONF_FILES_PATH.get(DataEntity._CHANGELOG_))

            .then(response => response.json())

            .then(data => {
                
                if (data.length > 0) {
                    

                    data.forEach(changelog => {

                        if (changelog['date'] && changelog['date'] === DateHandler.getDateMonth()) {

                            this._addNewChangeAtChangelog(data, changelog['date'], changeData);

                        } else {

                            this._createNewChangelog(data ,changeData);

                        }

                    });

                } else {
                    
                    this._createNewChangelog(data, changeData);

                }

            })

            .catch(error => Logger.log(error));

    }

    private static _addNewChangeAtChangelog(oldData, changeDate: string ,change: string): void {

        oldData.forEach(data => {

            alert(changeDate)
            if (data['date'] == changeDate) {
                data['changes'].push(change);
            }

        });

        oldData = JSON.stringify(oldData);
        alert(oldData);

        fetch(Config.LOCAL_RECEPTOR_SERVER + "?data=" + encodeURI(oldData) + "&file=" + "../../data/conf/changelog.json", {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'Application/json'
            }
        });

    }

    private static _createNewChangelog(oldData ,change: string): void {

        let jsonData = ChangelogSerializer.serializer(

            Identificator.generateID(),
            "teste",
            DateHandler.getDateMonth(),
            [change],
            'atualização'

        ); 
        

        oldData.push(jsonData);

        fetch(Config.LOCAL_RECEPTOR_SERVER + "?data=" + encodeURI(JSON.stringify(oldData)) + "&file=" + "../../data/conf/changelog.json", {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'Application/json'
            }
        });

            

    }

}