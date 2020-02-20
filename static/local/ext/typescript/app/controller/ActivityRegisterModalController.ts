import { Controller }                       from './../../core/Controller.js';
import { ActivityModel }                    from './../model/ActivityModel.js';
import { MessageModel }                     from './../model/MessageModel.js';
import { MessageBuilder }                   from './../../util/MessageBuilder.js';
import { Config, DataEntity }               from './../../conf/Config.js';
import { Logger }                           from './../../util/Logger.js';
import { ActivityRegisterModalElements }    from './../elements/ActivityRegisterModelElements.js';
import { SpeakerModel }                     from './../model/SpeakerModel.js';
import { TrackModel }                       from './../model/TrackModel.js';
import { Updater }                          from './../../util/Updater.js';


export class ActivityRegisterModalController extends Controller {

    private _elements:      Map<string, HTMLElement>;
    private _messageModel:  MessageModel;
    private _speakerModel:  SpeakerModel;
    private _trackModel:    TrackModel;
    private _activityModel: ActivityModel;
    private _messageData;
    private _activityData;

    constructor() {

        super();
        this._messageModel  = new MessageModel(DataEntity._ACTIVITY_REGISTER_MODAL_MESSAGES_);
        this._activityModel = new ActivityModel();
        this._trackModel    = new TrackModel();
        this._elements      = ActivityRegisterModalElements.ELEMENTS;
        this._getPageMessages();
        this._initListeners();

    }

    private _getPageMessages(): void {

        this._messageData  = this._messageModel.all();

        this._messageData.then(data => {

            let elementKey: string;

            data['pt-BR'].forEach(message => {

                Object.keys(message).forEach(key => {

                    MessageBuilder.buildMessage(this._elements.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                    
                });
                
            });

        })

        .catch(error => Logger.log(error));

    }

    public create(): void {

        //@ts-ignore
        $('#activityRegisterModal').modal('show');
        //this._clearInputs();
        this._populateSpeakerList();
        //this._populateTrackList();
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_update').classList.add('d-none');
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_create').classList.remove('d-none');

    }

    private _populateTrackList(): void {

        let trackModel: TrackModel = new TrackModel();

        trackModel.all().then(data => {

            let fragment:       DocumentFragment = document.createDocumentFragment();
            let optionElement:  HTMLOptionElement;

            data.forEach(speaker => {

                alert(speaker);
                optionElement = <HTMLOptionElement> document.createElement('OPTION');
                optionElement.setAttribute('value', speaker['id']);
                optionElement.textContent = speaker['name'];
                fragment.appendChild(optionElement);

            });

             optionElement = <HTMLOptionElement> document.createElement('OPTION');
             optionElement.setAttribute('value','');
             optionElement.textContent = 'Nenhuma';
             fragment.appendChild(optionElement);

            ActivityRegisterModalElements.ELEMENTS.get('activity_register_data_responsible').appendChild(fragment);

        })
        
        .catch(error => Logger.log('Activity Register Modal Controller: ' + error));

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

            ActivityRegisterModalElements.ELEMENTS.get('activity_register_data_responsible').appendChild(fragment);

        })

        .catch(error => Logger.log('Activity Register Modal Controller: ' + error));

    }

    private _clearInputs(): void {

        this._elements.forEach(element => {

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
        $('#activityRegisterModal').modal('show');
        //this._clearInputs();
        this._populateActivity();
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_update').classList.remove('d-none');
        ActivityRegisterModalElements.ELEMENTS.get('activity_register_button_create').classList.add('d-none');

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

        this._elements.get('activity_register_button_create').addEventListener('click', event => {

            document.querySelector('#activityRegisterModal').addEventListener('DOMAttrModified', event => {

                //@ts-ignore
                if ((document.querySelector('#activityRegisterModal') as HTMLElement).style.display === 'none') {
                    Updater.updateData();
                }
    
            });

            this._activityModel.store({});

        });

    }

    private _initUpdateButtonListener(): void {

        this._elements.get('activity_register_button_update').addEventListener('click', event => {

            document.querySelector('#activityRegisterModal').addEventListener('DOMAttrModified', event => {

                //@ts-ignore
                if ((document.querySelector('#activityRegisterModal') as HTMLElement).style.display === 'none') {
                    Updater.updateData();
                }
    
            });

            this._activityModel.store({});

        });

    }

    private _populateActivity(): void {

        

    }

}