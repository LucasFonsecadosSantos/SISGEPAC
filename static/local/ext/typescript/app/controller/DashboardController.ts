import { Controller }           from './../../core/Controller.js';
import { Logger }               from './../../util/Logger.js';
import { MessageBuilder }       from './../../util/MessageBuilder.js';
import { Config, DataEntity }   from './../../conf/Config.js';
import { MessageModel }         from './../model/MessageModel.js';
import { EventModel }           from './../model/EventModel.js';
import { SpeakerModel }         from './../model/SpeakerModel.js';
import { ActivityModel }        from './../model/ActivityModel.js';
import { LanguageModel }        from './../model/LanguageModel.js';
import { DashboardElements }    from './../elements/DashboardElements.js';
import { TrackModel }           from './../model/TrackModel.js';

export class DashboardController extends Controller {

    private _elements:          Map<string, HTMLElement>;
    private _speakerModel:      SpeakerModel;
    private _eventModel:        EventModel;
    private _activityModel:     ActivityModel;
    private _messagesModel:     MessageModel;
    private _trackModel:        TrackModel;
    // private _proceedingsModel:  ProceedingsModel;
    // private _proceedingsData;
    // private _organizerModel:    OrganizerModel;
    // private _organizerData;
    private _languageModel:     LanguageModel;

    constructor(interfacePage?: boolean) {

        super();
        this._messagesModel = new MessageModel(DataEntity._DASHBOARD_MESSAGES_);
        this._eventModel    = new EventModel();
        this._languageModel = new LanguageModel();
        this._speakerModel  = new SpeakerModel();
        this._activityModel = new ActivityModel();
        this._trackModel    = new TrackModel();

        if (interfacePage) {
         
            this._elements = DashboardElements.ELEMENTS;
            this._getPageMessages();
            
            //TODO HERE
            // if (true) {

            //     //@ts-ignore
            //     $('#eventSettingsModal').modal('show');
                

            // } else {
            
                //this._populateLanguageData();
                this._populateCard02();
                this._populateCard03();
                this._populateCard05();
                this._populateCard06();
                //this._populateSpeakerData();
                // this._populateSponsorshipData();
                // this._populateOrganizationData();

            //}
        }

    }

    private _getPageMessages(): void {

        let messagesData  = this._messagesModel.all();

        messagesData.then(data => {

            let elementKey: string;

            data['pt-BR'].forEach(message => {

                Object.keys(message).forEach(key => {

                    MessageBuilder.buildMessage(this._elements.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                    
                });
                
            });

        })

        .catch(error => Logger.log(error));

    }

    private _populateLanguageData(): void {

        let languageData = this._languageModel.filter('using', true);

        languageData.then(data => console.log(data));

    }

    private _populateCard02(): void {

        let eventData = this._eventModel.all();

        eventData

            .then(data => {

                this._elements.get('card02_data_event-name').textContent        = data['title'];
                this._elements.get('card02_data_event-description').textContent = data['description'];
                this._elements.get('card02_data_event-institute').textContent   = data['institute'];
                this._elements.get('card02_data_event-type').textContent        = data['event-type'];
                this._elements.get('card02_data_event-area').textContent        = data['area'];
                this._elements.get('card02_data_event-edition').textContent     = data['edition'];

            })
            
            .catch(error => {Logger.log(error)});

    }

    private _populateCard03(): void {

        let eventData = this._eventModel.all();

        eventData

            .then(data => {

                Object.keys(data['social-networks']).forEach(key => {

                    this._elements.get('card03_data_event-' + key).textContent = data['social-networks'][key];

                });

                this._elements.get('card03_data_event-website').textContent = data['website'];
                this._elements.get('card03_data_event-email').textContent   = data['email'];
                
                data['telephone'].forEach(telephone => {

                    this._elements.get('card03_data_event-telephone').textContent += telephone;

                })

            })

            .catch(error => Logger.log(error));


    }

    public _populateCard05(): void {

        let speakerData = this._speakerModel.all();

        speakerData

            .then(data => {

                var fragment = document.createDocumentFragment();
                var trFragment = document.createDocumentFragment();

                if (data.length > 0) {

                    data.forEach(speaker => {

                        let trElement = document.createElement('TR');
                        let tdElement = document.createElement('TD');
                        let spanElement = document.createElement('SPAN');
                        let imgElement = document.createElement('IMG');


                        tdElement.className = 'text-center';
                        spanElement.classList.add('avatar','avatar-busy');
                        imgElement.setAttribute('src', "/remote/data/uploads/images/profile/" + speaker['avatar']);
                        imgElement.setAttribute('alt', speaker['name']);
                        imgElement.setAttribute('title', speaker['name']);
                        imgElement.setAttribute('data-toogle', 'tooltip');
                        imgElement.setAttribute('data-placement', 'right');
                        
                        spanElement.appendChild(imgElement);
                        tdElement.appendChild(spanElement);
                        fragment.appendChild(tdElement);

                        //cell 02
                        tdElement = document.createElement('TD');
                        let aElement = document.createElement('A');
                        aElement.className = "text-bold-600";
                        aElement.textContent = speaker['name'];
                        let pElement = document.createElement('P');
                        pElement.className = 'text-muted';
                        pElement.textContent = speaker['jobInstitute'];
                        tdElement.appendChild(aElement);
                        tdElement.appendChild(pElement);
                        pElement = document.createElement('P');
                        pElement.className = 'text-muted';
                        pElement.textContent = speaker['description'];
                        tdElement.appendChild(pElement);
                        fragment.appendChild(tdElement);

                        //cell03
                        tdElement = document.createElement('TD');
                        tdElement.classList.add('text-truncate','p-1');
                        let ulElement = document.createElement('UL');
                        //TODO IMPLEMENTAR ATIVIDADES
                        tdElement.appendChild(ulElement);
                        fragment.appendChild(tdElement);

                        //cell04
                        tdElement = document.createElement('TD');
                        tdElement.className = 'text-center';
                        let btnGroup = document.createElement('DIV');
                        btnGroup.className = 'btn-group';
                        btnGroup.setAttribute('role', 'group');
                        let buttonElement = document.createElement('BUTTON');
                        buttonElement.classList.add('btn','btn-icon','btn-secondary','btn-sm');
                        buttonElement.setAttribute('type','button');
                        buttonElement.setAttribute('data-toogle','tooltip');
                        buttonElement.setAttribute('data-popup','tooltip-custom');
                        buttonElement.setAttribute('data-original-title','Editar cadastro de ' + speaker['name']);
                        let iElement = document.createElement('I');
                        iElement.classList.add('la','la-edit');
                        buttonElement.appendChild(iElement);

                        buttonElement.addEventListener('click', event => {

                            location.hash = 'palestrante/' + speaker['id'] + '/editar';

                        });
                        btnGroup.appendChild(buttonElement);
                        
                        buttonElement = document.createElement('BUTTON');
                        buttonElement.classList.add('btn','btn-icon','btn-secondary','btn-sm');
                        buttonElement.setAttribute('type','button');
                        buttonElement.setAttribute('data-toogle','tooltip');
                        buttonElement.setAttribute('data-popup','tooltip-custom');
                        buttonElement.setAttribute('data-original-title','Visualizar cadastro de ' + speaker['name']);
                        iElement = document.createElement('I');
                        iElement.classList.add('la','la-eye');
                        buttonElement.appendChild(iElement);
                        btnGroup.appendChild(buttonElement);

                        buttonElement = document.createElement('BUTTON');
                        buttonElement.classList.add('btn','btn-icon','btn-red','btn-sm');
                        buttonElement.setAttribute('type','button');
                        buttonElement.setAttribute('data-toogle','tooltip');
                        buttonElement.setAttribute('data-popup','tooltip-custom');
                        buttonElement.setAttribute('data-original-title','Remover cadastro de ' + speaker['name']);
                        iElement = document.createElement('I');
                        iElement.classList.add('la','la-trash');
                        buttonElement.appendChild(iElement);
                        buttonElement.addEventListener('click', event => {

                            location.hash = 'palestrante/' + speaker['id'] + '/remover';

                        });
                        btnGroup.appendChild(buttonElement);
                        tdElement.appendChild(btnGroup);


                        fragment.appendChild(tdElement);
                        trElement.appendChild(fragment)
                        this._elements.get('speakerTable').appendChild(trElement);

                    });

                } else {

                    let trElement = document.createElement('TR');
                    let tdElement = document.createElement('TD');
                    let pElement  = document.createElement('P');
                    tdElement.setAttribute('colspan', '4');
                    tdElement.className = "text-center";
                    pElement.className = "text-muted";
                    pElement.textContent = "Nenhum palestrante foi registrado até o momento.";

                    tdElement.appendChild(pElement);
                    fragment.appendChild(tdElement);
                    trElement.appendChild(fragment)
                    this._elements.get('speakerTable').appendChild(trElement);

                }

                
            })

            .catch(error => {Logger.log(error)});


        this._elements.get('card05_button_create-speaker').addEventListener('click', event => {

            location.hash = "";
            location.hash = 'palestrante/*/cadastrar';

        });

        

    }

    private _populateCard06(): void {

        let activityData = this._activityModel.all();

        activityData.then(data => {

            var fragment = document.createDocumentFragment();
            var trFragment = document.createDocumentFragment();

            if (data.length > 0) {

                data.forEach(activity => {

                    let trElement = document.createElement('TR');
                    let tdElement = document.createElement('TD');
                    let spanElement = document.createElement('SPAN');
                    let imgElement = document.createElement('IMG');
                    let linkElement = document.createElement('A');

                    let responsible = this._speakerModel.filter('id', activity['responsible_id']);
                    tdElement.style.width = "10%";
                    tdElement.className = 'text-center';
                    spanElement.classList.add('avatar','avatar-busy');
                    responsible.then(speaker => {

                        imgElement.setAttribute('src', "/remote/data/uploads/images/profile/" + speaker[0]['avatar']);
                        imgElement.setAttribute('alt', activity['title']);
                        imgElement.setAttribute('title', activity['title']);
                        imgElement.setAttribute('data-toogle', 'tooltip');
                        imgElement.setAttribute('data-placement', 'right');
                        linkElement.className = 'text-bold-600';
                        linkElement.textContent = speaker[0]['name'];
                        linkElement.addEventListener('click', event => {

                            location.hash = 'palestrante/' + speaker[0]['id'] + '/editar';

                        });

                    });
                    
                    spanElement.appendChild(imgElement);
                    tdElement.appendChild(spanElement);
                    tdElement.appendChild(document.createElement('BR'));
                    tdElement.appendChild(linkElement);
                    fragment.appendChild(tdElement);

                    //cell 02
                    tdElement = document.createElement('TD');
                    tdElement.style.width = "60%";
                    let aElement = document.createElement('A');
                    aElement.className = "text-bold-600";
                    aElement.textContent = activity['title'];
                    let pElement = document.createElement('P');
                    pElement.classList.add('text-muted','font-small-3');
                    pElement.textContent = activity['description'];
                    tdElement.appendChild(aElement);
                    tdElement.appendChild(pElement);
                    pElement.style.wordBreak = "break-all";
                    pElement.style.wordWrap = "break-word";
                    pElement.style.whiteSpace = "normal";
                    fragment.appendChild(tdElement);

                    //cell03
                    tdElement = document.createElement('TD');
                    tdElement.style.width = "10%";
                    pElement = document.createElement('P');
                    pElement.classList.add('text-muted','success', 'font-small-3');
                    pElement.textContent = activity['start_date'] + " - " + activity['start_time'];
                    tdElement.appendChild(pElement);
                    pElement = document.createElement('P');
                    pElement.classList.add('text-muted','danger','font-small-3');
                    pElement.textContent = activity['end_date'] + " - " + activity['end_time'];
                    tdElement.appendChild(pElement);
                    fragment.appendChild(tdElement);

                    //cell 04
                    tdElement = document.createElement('TD');
                    tdElement.style.width = "10%";
                    let badgeElement;
                    let track = this._trackModel.filter('id', activity['track_id']);
                    pElement = document.createElement('P');
                    
                    track.then(fetched => {

                        if ((fetched !== undefined) && ((fetched as Array<Object>).length > 0)) {
                            
                            (fetched as Array<Object>).forEach(track => {

                                badgeElement = document.createElement('DIV');
                                badgeElement.classList.add('badge','border-left-danger','badge-striped');
                                badgeElement.textContent = track['name'];
                                tdElement.appendChild(badgeElement);
                            });

                        } else {

                            pElement.textContent = "Nenhum";
                            
                        }

                    });
                    tdElement.appendChild(pElement);
                    fragment.appendChild(tdElement);


                    //cell05
                    tdElement = document.createElement('TD');
                    tdElement.style.width = "10%";
                    tdElement.className = 'text-center';
                    let btnGroup = document.createElement('DIV');
                    btnGroup.className = 'btn-group';
                    btnGroup.setAttribute('role', 'group');
                    let buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn','btn-icon','btn-secondary','btn-sm');
                    buttonElement.setAttribute('type','button');
                    buttonElement.setAttribute('data-toogle','tooltip');
                    buttonElement.setAttribute('data-popup','tooltip-custom');
                    buttonElement.setAttribute('data-original-title','Editar cadastro da atividade ' + activity['title']);
                    let iElement = document.createElement('I');
                    iElement.classList.add('la','la-edit');
                    buttonElement.appendChild(iElement);

                    buttonElement.addEventListener('click', event => {

                        location.hash = 'atividade/' + activity['id'] + '/editar';

                    });
                    btnGroup.appendChild(buttonElement);
                    
                    buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn','btn-icon','btn-secondary','btn-sm');
                    buttonElement.setAttribute('type','button');
                    buttonElement.setAttribute('data-toogle','tooltip');
                    buttonElement.setAttribute('data-popup','tooltip-custom');
                    buttonElement.setAttribute('data-original-title','Visualizar cadastro da atividade ' + activity['title']);
                    iElement = document.createElement('I');
                    iElement.classList.add('la','la-eye');
                    buttonElement.appendChild(iElement);
                    btnGroup.appendChild(buttonElement);

                    buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn','btn-icon','btn-red','btn-sm');
                    buttonElement.setAttribute('type','button');
                    buttonElement.setAttribute('data-toogle','tooltip');
                    buttonElement.setAttribute('data-popup','tooltip-custom');
                    buttonElement.setAttribute('data-original-title','Remover atividade ' + activity['title']);
                    iElement = document.createElement('I');
                    iElement.classList.add('la','la-trash');
                    buttonElement.appendChild(iElement);
                    buttonElement.addEventListener('click', event => {

                        location.hash = 'atividade/' + activity['id'] + '/remover';

                    });
                    btnGroup.appendChild(buttonElement);
                    tdElement.appendChild(btnGroup);


                    fragment.appendChild(tdElement);
                    trElement.appendChild(fragment)
                    this._elements.get('activityTable').appendChild(trElement);

                });

            }  else {

                let trElement = document.createElement('TR');
                let tdElement = document.createElement('TD');
                let pElement  = document.createElement('P');
                tdElement.setAttribute('colspan', '5');
                tdElement.className = "text-center";
                pElement.className = "text-muted";
                pElement.textContent = "Nenhum palestrante foi registrado até o momento.";

                tdElement.appendChild(pElement);
                fragment.appendChild(tdElement);
                trElement.appendChild(fragment)
                this._elements.get('activityTable').appendChild(trElement);

            }

        })

        .catch(exception => Logger.log("Dashboard controller: " + exception));

        this._elements.get('card06_button_create-activity').addEventListener('click', event => {

            location.hash = "";
            location.hash = 'atividade/*/cadastrar';

        });


    }


}