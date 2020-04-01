import { Controller } from './../../core/Controller.js';
import { Logger } from './../../util/Logger.js';
import { MessageBuilder } from './../../util/MessageBuilder.js';
import { DataEntity } from './../../conf/Config.js';
import { MessageModel } from './../model/MessageModel.js';
import { EventModel } from './../model/EventModel.js';
import { SpeakerModel } from './../model/SpeakerModel.js';
import { ActivityModel } from './../model/ActivityModel.js';
import { LanguageModel } from './../model/LanguageModel.js';
import { DashboardElements } from './../elements/DashboardElements.js';
import { TrackModel } from './../model/TrackModel.js';
import { SponsorshipPlanModel } from './../model/SponsorshipPlanModel.js';
import { ComponentFactory } from './../../util/ComponentFactory.js';
import { ComponentEnum } from '../../util/ComponentFactory.js';
export class DashboardController extends Controller {
    constructor(interfacePage) {
        super();
        this._messagesModel = new MessageModel(DataEntity._DASHBOARD_MESSAGES_);
        this._eventModel = new EventModel();
        this._languageModel = new LanguageModel();
        this._speakerModel = new SpeakerModel();
        this._activityModel = new ActivityModel();
        this._trackModel = new TrackModel();
        this._sponsorshipPlanModel = new SponsorshipPlanModel();
        if (interfacePage) {
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
            this._populateCard07();
            this._populateCard08();
            //}
        }
    }
    _getPageMessages() {
        let messagesData = this._messagesModel.all();
        messagesData.then(data => {
            data['pt-BR'].forEach(message => {
                Object.keys(message).forEach(key => {
                    MessageBuilder.buildMessage(DashboardElements.ELEMENTS.get((message['id']) ? message['id'] : (message['tag'])), key, message[key]);
                });
            });
        })
            .catch(error => Logger.log(error));
    }
    _populateLanguageData() {
        let languageData = this._languageModel.filter('using', true);
        languageData.then(data => console.log(data));
    }
    _populateCard02() {
        let eventData = this._eventModel.all();
        eventData
            .then(data => {
            DashboardElements.ELEMENTS.get('card02_data_event-name').textContent = data['title'];
            DashboardElements.ELEMENTS.get('card02_data_event-description').textContent = data['description'];
            DashboardElements.ELEMENTS.get('card02_data_event-institute').textContent = data['institute'];
            DashboardElements.ELEMENTS.get('card02_data_event-type').textContent = data['event-type'];
            DashboardElements.ELEMENTS.get('card02_data_event-area').textContent = data['area'];
            DashboardElements.ELEMENTS.get('card02_data_event-edition').textContent = data['edition'];
        })
            .catch(error => { Logger.log(error); });
    }
    _populateCard03() {
        let eventData = this._eventModel.all();
        eventData
            .then(data => {
            Object.keys(data['social-networks']).forEach(key => {
                DashboardElements.ELEMENTS.get('card03_data_event-' + key).textContent = data['social-networks'][key];
            });
            DashboardElements.ELEMENTS.get('card03_data_event-website').textContent = data['website'];
            DashboardElements.ELEMENTS.get('card03_data_event-email').textContent = data['email'];
            data['telephone'].forEach(telephone => {
                DashboardElements.ELEMENTS.get('card03_data_event-telephone').textContent += telephone;
            });
        })
            .catch(error => Logger.log(error));
    }
    _populateCard05() {
        let speakerData = this._speakerModel.all();
        speakerData
            .then(data => {
            DashboardElements.ELEMENTS.get('speakerTable').appendChild(ComponentFactory.renderComponent(ComponentEnum.SPEAKER_TABLE, data));
        })
            .catch(error => { Logger.log(error); });
        DashboardElements.ELEMENTS.get('card05_button_create-speaker').addEventListener('click', event => {
            location.hash = "";
            location.hash = 'palestrante/*/cadastrar';
        });
    }
    _populateCard06() {
        let activityData = this._activityModel.fetchAllJoin();
        activityData.then(data => {
            DashboardElements.ELEMENTS.get('activityTable').appendChild(ComponentFactory.renderComponent(ComponentEnum.ACTIVITY_TABLE, data));
            // var fragment = document.createDocumentFragment();
            // var trFragment = document.createDocumentFragment();
            // if (data.length > 0) {
            //     data.forEach(activity => {
            //         let trElement = document.createElement('TR');
            //         let tdElement = document.createElement('TD');
            //         let spanElement = document.createElement('SPAN');
            //         let imgElement = document.createElement('IMG');
            //         let linkElement = document.createElement('A');
            //         let responsible = this._speakerModel.filter('id', activity['responsible_id']);
            //         tdElement.style.width = "10%";
            //         tdElement.className = 'text-center';
            //         spanElement.classList.add('avatar','avatar-busy');
            //         responsible.then(speaker => {
            //             imgElement.setAttribute('src', "/remote/data/uploads/images/profile/" + speaker[0]['avatar']);
            //             imgElement.setAttribute('alt', activity['title']);
            //             imgElement.setAttribute('title', activity['title']);
            //             imgElement.setAttribute('data-toogle', 'tooltip');
            //             imgElement.setAttribute('data-placement', 'right');
            //             linkElement.className = 'text-bold-600';
            //             linkElement.textContent = speaker[0]['name'];
            //             linkElement.addEventListener('click', event => {
            //                 location.hash = 'palestrante/' + speaker[0]['id'] + '/editar';
            //             });
            //         });
            //         spanElement.appendChild(imgElement);
            //         tdElement.appendChild(spanElement);
            //         tdElement.appendChild(document.createElement('BR'));
            //         tdElement.appendChild(linkElement);
            //         fragment.appendChild(tdElement);
            //         //cell 02
            //         tdElement = document.createElement('TD');
            //         tdElement.style.width = "60%";
            //         let aElement = document.createElement('A');
            //         aElement.className = "text-bold-600";
            //         aElement.textContent = activity['title'];
            //         let pElement = document.createElement('P');
            //         pElement.classList.add('text-muted','font-small-3');
            //         pElement.textContent = activity['description'];
            //         tdElement.appendChild(aElement);
            //         tdElement.appendChild(pElement);
            //         pElement.style.wordBreak = "break-all";
            //         pElement.style.wordWrap = "break-word";
            //         pElement.style.whiteSpace = "normal";
            //         fragment.appendChild(tdElement);
            //         //cell03
            //         tdElement = document.createElement('TD');
            //         tdElement.style.width = "10%";
            //         pElement = document.createElement('P');
            //         pElement.classList.add('text-muted','success', 'font-small-3');
            //         pElement.textContent = activity['start_date'] + " - " + activity['start_time'];
            //         tdElement.appendChild(pElement);
            //         pElement = document.createElement('P');
            //         pElement.classList.add('text-muted','danger','font-small-3');
            //         pElement.textContent = activity['end_date'] + " - " + activity['end_time'];
            //         tdElement.appendChild(pElement);
            //         fragment.appendChild(tdElement);
            //         //cell 04
            //         tdElement = document.createElement('TD');
            //         tdElement.style.width = "10%";
            //         let badgeElement;
            //         let track = this._trackModel.filter('id', activity['track_id']);
            //         pElement = document.createElement('P');
            //         track.then(fetched => {
            //             if ((fetched !== undefined) && ((fetched as Array<Object>).length > 0)) {
            //                 (fetched as Array<Object>).forEach(track => {
            //                     badgeElement = document.createElement('DIV');
            //                     badgeElement.classList.add('badge','border-left-danger','badge-striped');
            //                     badgeElement.textContent = track['name'];
            //                     tdElement.appendChild(badgeElement);
            //                 });
            //             } else {
            //                 pElement.textContent = "Nenhum";
            //             }
            //         });
            //         tdElement.appendChild(pElement);
            //         fragment.appendChild(tdElement);
            //         //cell05
            //         tdElement = document.createElement('TD');
            //         tdElement.style.width = "10%";
            //         tdElement.className = 'text-center';
            //         let btnGroup = document.createElement('DIV');
            //         btnGroup.className = 'btn-group';
            //         btnGroup.setAttribute('role', 'group');
            //         let buttonElement = document.createElement('BUTTON');
            //         buttonElement.classList.add('btn','btn-icon','btn-secondary','btn-sm');
            //         buttonElement.setAttribute('type','button');
            //         buttonElement.setAttribute('data-toogle','tooltip');
            //         buttonElement.setAttribute('data-popup','tooltip-custom');
            //         buttonElement.setAttribute('data-original-title','Editar cadastro da atividade ' + activity['title']);
            //         let iElement = document.createElement('I');
            //         iElement.classList.add('la','la-edit');
            //         buttonElement.appendChild(iElement);
            //         buttonElement.addEventListener('click', event => {
            //             location.hash = 'atividade/' + activity['id'] + '/editar';
            //         });
            //         btnGroup.appendChild(buttonElement);
            //         buttonElement = document.createElement('BUTTON');
            //         buttonElement.classList.add('btn','btn-icon','btn-secondary','btn-sm');
            //         buttonElement.setAttribute('type','button');
            //         buttonElement.setAttribute('data-toogle','tooltip');
            //         buttonElement.setAttribute('data-popup','tooltip-custom');
            //         buttonElement.setAttribute('data-original-title','Visualizar cadastro da atividade ' + activity['title']);
            //         iElement = document.createElement('I');
            //         iElement.classList.add('la','la-eye');
            //         buttonElement.appendChild(iElement);
            //         btnGroup.appendChild(buttonElement);
            //         buttonElement = document.createElement('BUTTON');
            //         buttonElement.classList.add('btn','btn-icon','btn-red','btn-sm');
            //         buttonElement.setAttribute('type','button');
            //         buttonElement.setAttribute('data-toogle','tooltip');
            //         buttonElement.setAttribute('data-popup','tooltip-custom');
            //         buttonElement.setAttribute('data-original-title','Remover atividade ' + activity['title']);
            //         iElement = document.createElement('I');
            //         iElement.classList.add('la','la-trash');
            //         buttonElement.appendChild(iElement);
            //         buttonElement.addEventListener('click', event => {
            //             location.hash = 'atividade/' + activity['id'] + '/remover';
            //         });
            //         btnGroup.appendChild(buttonElement);
            //         tdElement.appendChild(btnGroup);
            //         fragment.appendChild(tdElement);
            //         trElement.appendChild(fragment)
            //         DashboardElements.ELEMENTS.get('activityTable').appendChild(trElement);
            //     });
            // }  else {
            //     let trElement = document.createElement('TR');
            //     let tdElement = document.createElement('TD');
            //     let pElement  = document.createElement('P');
            //     tdElement.setAttribute('colspan', '5');
            //     tdElement.className = "text-center";
            //     pElement.className = "text-muted";
            //     pElement.textContent = "Nenhum palestrante foi registrado até o momento.";
            //     tdElement.appendChild(pElement);
            //     fragment.appendChild(tdElement);
            //     trElement.appendChild(fragment)
            //     DashboardElements.ELEMENTS.get('activityTable').appendChild(trElement);
            // }
        })
            .catch(exception => Logger.log("Dashboard controller: " + exception));
        DashboardElements.ELEMENTS.get('card06_button_create-activity').addEventListener('click', event => {
            location.hash = "";
            location.hash = 'atividade/*/cadastrar';
        });
    }
    _populateCard07() {
        let sponsorshipPlanData = this._sponsorshipPlanModel.all();
        sponsorshipPlanData
            .then(data => {
            var fragment = document.createDocumentFragment();
            var trFragment = document.createDocumentFragment();
            if (data.length > 0) {
                data.forEach(sponsorshipPlan => {
                    let trElement = document.createElement('TR');
                    let tdElement = document.createElement('TD');
                    let spanElement = document.createElement('SPAN');
                    let imgElement = document.createElement('IMG');
                    tdElement.style.width = "20%";
                    tdElement.className = 'text-center';
                    spanElement.classList.add('avatar', 'avatar-busy');
                    imgElement.setAttribute('src', "/remote/data/uploads/images/profile/" + sponsorshipPlan['avatar']);
                    imgElement.setAttribute('alt', sponsorshipPlan['name']);
                    imgElement.setAttribute('title', sponsorshipPlan['name']);
                    imgElement.setAttribute('data-toogle', 'tooltip');
                    imgElement.setAttribute('data-placement', 'right');
                    spanElement.appendChild(imgElement);
                    tdElement.appendChild(spanElement);
                    fragment.appendChild(tdElement);
                    //cell 02
                    tdElement = document.createElement('TD');
                    tdElement.style.width = "60%";
                    let aElement = document.createElement('A');
                    aElement.className = "text-bold-600";
                    aElement.textContent = sponsorshipPlan['name'];
                    let pElement = document.createElement('P');
                    pElement.classList.add('text-muted', 'font-small-3');
                    pElement.textContent = sponsorshipPlan['description'];
                    tdElement.appendChild(aElement);
                    tdElement.appendChild(pElement);
                    pElement.style.wordBreak = "break-all";
                    pElement.style.wordWrap = "break-word";
                    pElement.style.whiteSpace = "normal";
                    fragment.appendChild(tdElement);
                    //cell03
                    tdElement = document.createElement('TD');
                    tdElement.style.width = "20%";
                    pElement = document.createElement('P');
                    pElement.classList.add('text-muted');
                    pElement.textContent = "R$ " + sponsorshipPlan['price'];
                    tdElement.appendChild(pElement);
                    fragment.appendChild(tdElement);
                    //cell04
                    tdElement = document.createElement('TD');
                    tdElement.style.width = "10%";
                    tdElement.className = 'text-center';
                    let btnGroup = document.createElement('DIV');
                    btnGroup.className = 'btn-group';
                    btnGroup.setAttribute('role', 'group');
                    let buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn', 'btn-icon', 'btn-secondary', 'btn-sm');
                    buttonElement.setAttribute('type', 'button');
                    buttonElement.setAttribute('data-toogle', 'tooltip');
                    buttonElement.setAttribute('data-popup', 'tooltip-custom');
                    buttonElement.setAttribute('data-original-title', 'Editar cadastro do plano ' + sponsorshipPlan['name']);
                    let iElement = document.createElement('I');
                    iElement.classList.add('la', 'la-edit');
                    buttonElement.appendChild(iElement);
                    buttonElement.addEventListener('click', event => {
                        location.hash = 'planopatrocinio/' + sponsorshipPlan['id'] + '/editar';
                    });
                    btnGroup.appendChild(buttonElement);
                    buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn', 'btn-icon', 'btn-secondary', 'btn-sm');
                    buttonElement.setAttribute('type', 'button');
                    buttonElement.setAttribute('data-toogle', 'tooltip');
                    buttonElement.setAttribute('data-popup', 'tooltip-custom');
                    buttonElement.setAttribute('data-original-title', 'Visualizar cadastro do plano ' + sponsorshipPlan['name']);
                    iElement = document.createElement('I');
                    iElement.classList.add('la', 'la-eye');
                    buttonElement.appendChild(iElement);
                    btnGroup.appendChild(buttonElement);
                    buttonElement = document.createElement('BUTTON');
                    buttonElement.classList.add('btn', 'btn-icon', 'btn-red', 'btn-sm');
                    buttonElement.setAttribute('type', 'button');
                    buttonElement.setAttribute('data-toogle', 'tooltip');
                    buttonElement.setAttribute('data-popup', 'tooltip-custom');
                    buttonElement.setAttribute('data-original-title', 'Remover plano ' + sponsorshipPlan['name']);
                    iElement = document.createElement('I');
                    iElement.classList.add('la', 'la-trash');
                    buttonElement.appendChild(iElement);
                    buttonElement.addEventListener('click', event => {
                        location.hash = 'planopatrocinio/' + sponsorshipPlan['id'] + '/remover';
                    });
                    btnGroup.appendChild(buttonElement);
                    tdElement.appendChild(btnGroup);
                    fragment.appendChild(tdElement);
                    trElement.appendChild(fragment);
                    DashboardElements.ELEMENTS.get('sponsorshipPlanTable').appendChild(trElement);
                });
            }
            else {
                let trElement = document.createElement('TR');
                let tdElement = document.createElement('TD');
                let pElement = document.createElement('P');
                tdElement.setAttribute('colspan', '5');
                tdElement.className = "text-center";
                pElement.className = "text-muted";
                pElement.textContent = "Nenhum plano foi registrado até o momento.";
                tdElement.appendChild(pElement);
                fragment.appendChild(tdElement);
                trElement.appendChild(fragment);
                DashboardElements.ELEMENTS.get('sponsorshipPlanTable').appendChild(trElement);
            }
        })
            .catch(error => Logger.log("Dashboard controller sponsorship plan data error: " + error));
        DashboardElements.ELEMENTS.get('card07_button_create-sponsorshipplan').addEventListener('click', event => {
            location.hash = "";
            location.hash = 'planopatrocinio/*/cadastrar';
        });
    }
    _populateCard08() {
        //alert(ComponentFactory.renderComponent(ComponentEnum.SPEAKER_TABLE, {}));
        DashboardElements.ELEMENTS.get('card08_button_create-sponsorship').addEventListener('click', event => {
            location.hash = "";
            location.hash = 'patrocinador/*/cadastrar';
        });
    }
}
//# sourceMappingURL=DashboardController.js.map