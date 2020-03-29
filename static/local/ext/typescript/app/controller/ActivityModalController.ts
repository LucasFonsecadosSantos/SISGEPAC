import { Controller }                       from './../../core/Controller.js';
import { ActivityModel }                    from './../model/ActivityModel.js';
import { MessageModel }                     from './../model/MessageModel.js';
import { MessageBuilder }                   from './../../util/MessageBuilder.js';
import { Config, DataEntity }               from './../../conf/Config.js';
import { Logger }                           from './../../util/Logger.js';
import { ActivityModalElements }            from './../elements/ActivityModelElements.js';
import { SpeakerModel }                     from './../model/SpeakerModel.js';
import { TrackModel }                       from './../model/TrackModel.js';
import { Updater }                          from './../../util/Updater.js';
import { InvalidDataKeyException }          from './../../exception/InvalidDataKeyException.js';
import { Identificator }                    from './../../util/Indentificator.js';


export class ActivityModalController extends Controller {

    private _messageModel:  MessageModel;
    private _speakerModel:  SpeakerModel;
    private _trackModel:    TrackModel;
    private _activityModel: ActivityModel;

    constructor() {

        super();
        this._messageModel  = new MessageModel(DataEntity._ACTIVITY_MODAL_MESSAGES_);
        this._activityModel = new ActivityModel();
        this._trackModel    = new TrackModel();
        this._getPageMessages();
        this._initListeners();

    }

    private _getPageMessages(): void {

        let messageData  = this._messageModel.all();

        messageData.then(data => {

            data['pt-BR'].forEach(message => {

                Object.keys(message).forEach(key => {

                    MessageBuilder.buildMessage(ActivityModalElements.ELEMENTS.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                    
                });
                
            });

        })

        .catch(error => Logger.log(error));

    }

    public create(): void {

        //@ts-ignore
        $('#activityModal').modal('show');
        //this._clearInputs();
        this._populateSpeakerList();
        //this._populateTrackList();
        ActivityModalElements.ELEMENTS.get('activity_modal_button_update').classList.add('d-none');
        ActivityModalElements.ELEMENTS.get('activity_modal_button_create').classList.remove('d-none');

    }

    private _populateTrackList(): void {

        let trackModel: TrackModel = new TrackModel();

        trackModel.all().then(data => {

            let fragment:       DocumentFragment = document.createDocumentFragment();
            let optionElement:  HTMLOptionElement;

            data.forEach(speaker => {

                optionElement = <HTMLOptionElement> document.createElement('OPTION');
                optionElement.setAttribute('value', speaker['id']);
                optionElement.textContent = speaker['name'];
                fragment.appendChild(optionElement);

            });

             optionElement = <HTMLOptionElement> document.createElement('OPTION');
             optionElement.setAttribute('value','');
             optionElement.textContent = 'Nenhuma';
             fragment.appendChild(optionElement);

            ActivityModalElements.ELEMENTS.get('activity_modal_data_responsible').appendChild(fragment);

        })
        
        .catch(error => Logger.log('Activity Modal Controller: ' + error));

    }

    private _populateSpeakerList(): void {
        
        let speakerModel: SpeakerModel = new SpeakerModel();

        speakerModel.all().then(data => {

            let fragment:       DocumentFragment = document.createDocumentFragment();
            let optionElement:  HTMLOptionElement;
        
            data.forEach(speaker => {

                optionElement = <HTMLOptionElement> document.createElement('OPTION');
                optionElement.setAttribute('value', speaker['id']);
                optionElement.textContent = speaker['name'];
                fragment.appendChild(optionElement);

            });

            ActivityModalElements.ELEMENTS.get('activity_modal_data_responsible').appendChild(fragment);

        })

        .catch(error => Logger.log('Activity Modal Controller: ' + error));

    }

    private _clearInputs(): void {

        ActivityModalElements.ELEMENTS.forEach(element => {

            if (element.nodeName === 'INPUT') {
                element.nodeValue = "";
            }

            if (element.nodeName === 'SELECT') {
                element.innerHTML = '';
                let option: HTMLOptionElement = <HTMLOptionElement> document.createElement('OPTION');
                option.setAttribute('select', 'selected');
                option.setAttribute('value', 'default');
                option.textContent = '- SELECIONE -';
                element.appendChild(option);
            }

        });

    }

    public update(id: string): void {

        //@ts-ignore
        $('#activityModal').modal('show');
        //this._clearInputs();
        let activityModel = new ActivityModel();
        let targetActivity = activityModel.find('id', id);
        targetActivity.then(data => this._populateActivity(data));
        ActivityModalElements.ELEMENTS.get('activity_modal_button_update').classList.remove('d-none');
        ActivityModalElements.ELEMENTS.get('activity_modal_button_create').classList.add('d-none');

    }

    public delete(id: string): void {

        this._activityModel.delete('id', id);
        Updater.updateData();

    }

    private _initListeners(): void {

        this._initCreateButtonListener();
        this._initUpdateButtonListener();
    }

    private _initCreateButtonListener(): void {

        ActivityModalElements.ELEMENTS.get('activity_modal_button_create').addEventListener('click', event => {

            document.querySelector('#activityModal').addEventListener('DOMAttrModified', event => {

                //@ts-ignore
                if ((document.querySelector('#activityModal') as HTMLElement).style.display === 'none') {
                    
                    Updater.updateData();

                }
    
            });

            try {
            
                this._activityModel.imageUpload(new FormData((ActivityModalElements.ELEMENTS.get('dataForm') as HTMLFormElement)))

                    .then(response => {
                        
                        this._activityModel.insert(

                            {

                                "id":               (((ActivityModalElements.ELEMENTS.get('activity_modal_data_id') as HTMLInputElement).value === '') || (!(ActivityModalElements.ELEMENTS.get('activity_modal_data_id') as HTMLInputElement).value)) ? Identificator.generateID(): (ActivityModalElements.ELEMENTS.get('activity_modal_data_id') as HTMLInputElement).value,
                                "title":            (ActivityModalElements.ELEMENTS.get('activity_modal_data_title') as HTMLInputElement).value,
                                "responsible_id":   (ActivityModalElements.ELEMENTS.get('activity_modal_data_responsible') as HTMLSelectElement).value,
                                "avatar":           ((response['data_name'] === '') || (!response['data_name'])) ? "default-avatar.png" : response['data_name'],
                                "description":      (ActivityModalElements.ELEMENTS.get('activity_modal_data_description') as HTMLTextAreaElement).value,
                                "start_date":       (ActivityModalElements.ELEMENTS.get('activity_modal_data_startDate') as HTMLInputElement).value,
                                "start_time":       (ActivityModalElements.ELEMENTS.get('activity_modal_data_startTime') as HTMLInputElement).value,
                                "end_date":         (ActivityModalElements.ELEMENTS.get('activity_modal_data_endDate') as HTMLInputElement).value,
                                "end_time":         (ActivityModalElements.ELEMENTS.get('activity_modal_data_endTime') as HTMLInputElement).value,
                                "vacancies":        (ActivityModalElements.ELEMENTS.get('activity_modal_data_vacancies') as HTMLInputElement).value,
                                "restriction":      (ActivityModalElements.ELEMENTS.get('activity_modal_data_restriction') as HTMLInputElement).value,
                                "track_id":         (ActivityModalElements.ELEMENTS.get('activity_modal_data_track') as HTMLSelectElement).value,
                                "offering":         (ActivityModalElements.ELEMENTS.get('activity_modal_data_offering') as HTMLInputElement).value,
                                "location":         (ActivityModalElements.ELEMENTS.get('activity_modal_data_location') as HTMLInputElement).value,
                                //"geo-location":     (ActivityModalElements.ELEMENTS.get('activity_modal_data_title') as HTMLInputElement).value,
                                "price":            (ActivityModalElements.ELEMENTS.get('activity_modal_data_price') as HTMLInputElement).value,
                                "show":             true
    
                            }

                        );
                    })

                    .catch(error => Logger.log(error));

                } catch (exception) {
                
                    if (exception instanceof InvalidDataKeyException) {
    
                        Logger.log("Update Exception: " + exception.message);
    
                    }
    
                }
            
            //@ts-ignore
            $('#activityModal').modal('hide');

        }, false);

    }

    private _initUpdateButtonListener(): void {

        ActivityModalElements.ELEMENTS.get('activity_modal_button_update').addEventListener('click', event => {

            document.querySelector('#activityModal').addEventListener('DOMAttrModified', event => {

                //@ts-ignore
                if ((document.querySelector('#activityModal') as HTMLElement).style.display === 'none') {

                    Updater.updateData();

                }
    
            });

            this._activityModel.update(
                {
                    "title":            (ActivityModalElements.ELEMENTS.get('activity_modal_data_title') as HTMLInputElement).value,
                    "responsible_id":   (ActivityModalElements.ELEMENTS.get('activity_modal_data_responsible') as HTMLSelectElement).value,
                    //"avatar":           ((response['data_name'] === '') || (!response['data_name'])) ? "/local/img/structure/default-avatar.png" : response['data_name'],
                    "description":      (ActivityModalElements.ELEMENTS.get('activity_modal_data_description') as HTMLTextAreaElement).value,
                    "start_date":       (ActivityModalElements.ELEMENTS.get('activity_modal_data_startDate') as HTMLInputElement).value,
                    "start_time":       (ActivityModalElements.ELEMENTS.get('activity_modal_data_startTime') as HTMLInputElement).value,
                    "end_date":         (ActivityModalElements.ELEMENTS.get('activity_modal_data_endDate') as HTMLInputElement).value,
                    "end_time":         (ActivityModalElements.ELEMENTS.get('activity_modal_data_endTime') as HTMLInputElement).value,
                    "vacancies":        (ActivityModalElements.ELEMENTS.get('activity_modal_data_vacancies') as HTMLInputElement).value,
                    "restriction":      (ActivityModalElements.ELEMENTS.get('activity_modal_data_restriction') as HTMLInputElement).value,
                    "track_id":         (ActivityModalElements.ELEMENTS.get('activity_modal_data_track') as HTMLSelectElement).value,
                    "offering":         (ActivityModalElements.ELEMENTS.get('activity_modal_data_offering') as HTMLInputElement).value,
                    "location":         (ActivityModalElements.ELEMENTS.get('activity_modal_data_location') as HTMLInputElement).value,
                    //"geo-location":     (ActivityModalElements.ELEMENTS.get('activity_modal_data_title') as HTMLInputElement).value,
                    "price":            (ActivityModalElements.ELEMENTS.get('activity_modal_data_price') as HTMLInputElement).value,
                    "show":             true
                },
                {
                    "id": (ActivityModalElements.ELEMENTS.get('activity_modal_data_id') as HTMLInputElement).value
                }
            );
        
            //@ts-ignore
            $('#activityModal').modal('hide');

        }, false);

    }

    private _populateActivity(activity: Object): void {

        (ActivityModalElements.ELEMENTS.get('activity_modal_data_title')         as HTMLInputElement).value      = activity['title'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_id')            as HTMLInputElement).value      = activity['id'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_responsible')   as HTMLSelectElement).value     = activity['responsible_id'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_description')   as HTMLTextAreaElement).value   = activity['description'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_startDate')     as HTMLInputElement).value      = activity['start_date'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_startTime')     as HTMLInputElement).value      = activity['start_time'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_endDate')       as HTMLInputElement).value      = activity['end_date'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_endTime')       as HTMLInputElement).value      = activity['end_time'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_vacancies')     as HTMLInputElement).value      = activity['vacancies'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_restriction')   as HTMLInputElement).value      = activity['restriction'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_track')         as HTMLSelectElement).value     = activity['track_id'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_offering')      as HTMLSelectElement).value     = activity['offering'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_location')      as HTMLSelectElement).value     = activity['location'];
        //(this._elements.get('activity_register_data_track')       as HTMLSelectElement).value     = activity['geo-location'];
        (ActivityModalElements.ELEMENTS.get('activity_modal_data_price')         as HTMLSelectElement).value     = activity['price'];

    }

}