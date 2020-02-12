import { Controller }           from './../../core/Controller.js';
import { Logger }               from './../../util/Logger.js';
import { MessageBuilder }       from './../../util/MessageBuilder.js';
import { Config, DataEntity }   from './../../conf/Config.js';
import { MessageModel }         from './../model/MessageModel.js';
import { EventModel }           from './../model/EventModel.js';
import { SpeakerModel }         from './../model/SpeakerModel.js';
import { LanguageModel }        from './../model/LanguageModel.js';

export class DashboardController extends Controller {

    private _elements:          Array<HTMLElement>;
    private _sponsorshipData;
    private _speakerModel:      SpeakerModel;
    private _speakerData;
    private _eventModel:        EventModel;
    private _eventData;
    private _messagesModel:     MessageModel;
    private _messagesData;
    // private _proceedingsModel:  ProceedingsModel;
    // private _proceedingsData;
    // private _organizerModel:    OrganizerModel;
    // private _organizerData;
    private _languageModel:     LanguageModel;
    private _languageData;

    constructor(interfacePage?: boolean) {

        super();
        this._messagesModel = new MessageModel(DataEntity._DASHBOARD_MESSAGES_);
        this._eventModel    = new EventModel();
        this._languageModel = new LanguageModel();
        this._speakerModel  = new SpeakerModel();
        
        if (interfacePage) {
         
            this._initializeElements();
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
                //this._populateSpeakerData();
                // this._populateSponsorshipData();
                // this._populateOrganizationData();

            //}
        }

    }

    private _initializeElements(): void {

        this._elements = new Array<HTMLElement>();

        this._elements['title']                     =   document.querySelector('title');
        this._elements['event-occurrence-title']    =   document.querySelector('#event-occurrence-title');
        this._elements['event-information-title']   =   document.querySelector('#event-information-title');

        //Card 02
        this._elements['card02_label_event-name']           =   document.querySelector('#card02_label_event-name');
        this._elements['card02_data_event-name']            =   document.querySelector('#card02_data_event-name');
        this._elements['card02_label_event-edition']        =   document.querySelector('#card02_label_event-edition');
        this._elements['card02_data_event-edition']         =   document.querySelector('#card02_data_event-edition');
        this._elements['card02_label_event-description']    =   document.querySelector('#card02_label_event-description');
        this._elements['card02_data_event-description']     =   document.querySelector('#card02_data_event-description');
        this._elements['card02_label_event-institute']      =   document.querySelector('#card02_label_event-institute');
        this._elements['card02_data_event-institute']       =   document.querySelector('#card02_data_event-institute');
        this._elements['card02_label_event-type']           =   document.querySelector('#card02_label_event-type');
        this._elements['card02_data_event-type']            =   document.querySelector('#card02_data_event-type');
        this._elements['card02_label_event-area']           =   document.querySelector('#card02_label_event-area');
        this._elements['card02_data_event-area']            =   document.querySelector('#card02_data_event-area');


        //Card 03
        this._elements['card03_label_event-twitter']        =   document.querySelector('#card03_label_event-twitter');
        this._elements['card03_data_event-twitter']         =   document.querySelector('#card03_data_event-twitter');
        this._elements['card03_label_event-facebook']       =   document.querySelector('#card03_label_event-facebook');
        this._elements['card03_data_event-facebook']        =   document.querySelector('#card03_data_event-facebook');
        this._elements['card03_label_event-linkedin']       =   document.querySelector('#card03_label_event-linkedin');
        this._elements['card03_data_event-linkedin']        =   document.querySelector('#card03_data_event-linkedin');
        this._elements['card03_label_event-youtube']        =   document.querySelector('#card03_label_event-youtube');
        this._elements['card03_data_event-youtube']         =   document.querySelector('#card03_data_event-youtube');
        this._elements['card03_label_event-telephone']      =   document.querySelector('#card03_label_event-telephone');
        this._elements['card03_data_event-telephone']       =   document.querySelector('#card03_data_event-telephone');
        this._elements['card03_label_event-email']          =   document.querySelector('#card03_label_event-email');
        this._elements['card03_data_event-email']           =   document.querySelector('#card03_data_event-email');
        this._elements['card03_label_event-website']        =   document.querySelector('#card03_label_event-website');
        this._elements['card03_data_event-website']         =   document.querySelector('#card03_data_event-website');
        this._elements['card03_label_event-instagram']      =   document.querySelector('#card03_label_event-instagram');
        this._elements['card03_data_event-instagram']       =   document.querySelector('#card03_data_event-instagram');
        this._elements['card03_label_event-contact-info']   =   document.querySelector('#card03_label_event-contact-info');

        //card04
        this._elements['card04_label_title']                =   document.querySelector('#card04_label_title');

        //Card 05
        this._elements['card05_button_create-speaker']      =   document.querySelector('#card05_button_create-speaker');
        this._elements['card05_button_create-speaker-icon'] =   document.querySelector('#card05_button_create-speaker-icon');
        this._elements['card05_button_create-speaker-text'] =   document.querySelector('#card05_button_create-speaker-text');
        this._elements['card05_label_title']                =   document.querySelector('#card05_label_title');
        this._elements['card05_table_label_column01']       =   document.querySelector('#card05_table_label_column01');
        this._elements['card05_table_label_column02']       =   document.querySelector('#card05_table_label_column02');
        this._elements['card05_table_label_column03']       =   document.querySelector('#card05_table_label_column03');
        this._elements['card05_table_label_column04']       =   document.querySelector('#card05_table_label_column04');

        //Card 06
        this._elements['card06_label_title']                =   document.querySelector('#card06_label_title');
        this._elements['card06_table_label_column01']       =   document.querySelector('#card06_table_label_column01');
        this._elements['card06_table_label_column02']       =   document.querySelector('#card06_table_label_column02');
        this._elements['card06_table_label_column03']       =   document.querySelector('#card06_table_label_column03');
        this._elements['card06_table_label_column04']       =   document.querySelector('#card06_table_label_column04');

        //Card 07
        this._elements['card07_label_title']                =   document.querySelector('#card07_label_title');
        this._elements['card07_table_label_column01']       =   document.querySelector('#card07_table_label_column01');
        this._elements['card07_table_label_column02']       =   document.querySelector('#card07_table_label_column02');
        this._elements['card07_table_label_column03']       =   document.querySelector('#card07_table_label_column03');
        this._elements['card07_table_label_column04']       =   document.querySelector('#card07_table_label_column04');

        //Card08
        this._elements['card08_label_title']                =   document.querySelector('#card08_label_title');
        this._elements['card08_table_label_column01']       =   document.querySelector('#card08_table_label_column01');
        this._elements['card08_table_label_column02']       =   document.querySelector('#card08_table_label_column02');
        this._elements['card08_table_label_column03']       =   document.querySelector('#card08_table_label_column03');
        this._elements['card08_table_label_column04']       =   document.querySelector('#card08_table_label_column04');
        this._elements['card08_table_label_column05']       =   document.querySelector('#card08_table_label_column05');

        //Card 09
        this._elements['card09_label_title']                =   document.querySelector('#card09_label_title');

        //Card 010
        this._elements['card010_label_title']               =   document.querySelector('#card010_label_title');
        this._elements['card010_table_label_column01']      =   document.querySelector('#card010_table_label_column01');
        this._elements['card010_table_label_column02']      =   document.querySelector('#card010_table_label_column02');
        this._elements['card010_table_label_column03']      =   document.querySelector('#card010_table_label_column03');
        
        
    }

    private _getPageMessages(): void {

        this._messagesData  = this._messagesModel.all();

        this._messagesData.then(data => {

            let elementKey: string;

            data['pt-BR'].forEach(message => {

                Object.keys(message).forEach(key => {

                    MessageBuilder.buildMessage(this._elements[(message['id']) ? message['id'] : (message['tag'])], key, message[key]);
                    
                });
                
            });

        })

        .catch(error => Logger.log(error));

    }

    private _populateLanguageData(): void {

        this._languageData = this._languageModel.filter('using', true);

        this._languageData.then(data => console.log(data));

    }

    private _populateCard02(): void {

        this._eventData = this._eventModel.all();

        this._eventData

            .then(data => {

                this._elements['card02_data_event-name'].textContent        = data['title'];
                this._elements['card02_data_event-description'].textContent = data['description'];
                this._elements['card02_data_event-institute'].textContent   = data['institute'];
                this._elements['card02_data_event-type'].textContent        = data['event-type'];
                this._elements['card02_data_event-area'].textContent        = data['area'];
                this._elements['card02_data_event-edition'].textContent     = data['edition'];

            })
            
            .catch(error => {Logger.log(error)});

    }

    private _populateCard03(): void {

        this._eventData = this._eventModel.all();

        this._eventData

            .then(data => {

                Object.keys(data['social-networks']).forEach(key => {

                    this._elements['card03_data_event-' + key].textContent = data['social-networks'][key];

                });

                this._elements['card03_data_event-website'].textContent = data['website'];
                this._elements['card03_data_event-email'].textContent   = data['email'];
                
                data['telephone'].forEach(telephone => {

                    this._elements['card03_data_event-telephone'].textContent += telephone;

                })

            })

            .catch(error => Logger.log(error));


    }

    private _populateCard05(): void {

        this._speakerData = this._speakerModel.all();

        this._speakerData

            .then(data => {


            })

            .catch(error => {Logger.log(error)});


        this._elements['card05_button_create-speaker'].addEventListener('click', event => {

            //@ts-ignore
            $('#speakerRegisterModal').modal('show');

        });

    }
    

    // private _populateOrganizationData(): void {

    //     this._organizerData = this._organizerModel.all();

    //     this._organizerData

    //         .then(data => {

    //         })

    //         .catch(error => {Logger.log(error)});

    // }

    // private _populateSponsorshipData(): void {

    //     this._sponsorshipData = this._sponsorshipModel.all();

    //     this._sponsorshipData

    //         .then(data => {

    //         })

    //         .catch(error => {Logger.log(error)});

    // }

}