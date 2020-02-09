import { Logger } from './../util/Logger.js';

export enum DataEntity {

    _SPEAKER_                                   = "speaker",
    _SPONSORSHIP_                               = "sponsorship",
    _EVENT_                                     = "event",
    _TEMPLATE_                                  = "template",
    _LANGUAGE_                                  = "language",
    _PROCEEDINGS_                               = "proceedings",
    _PHOTO_GALLERY_                             = "gallery_gallery",
    _VIDEO_GALLERY_                             = "video_gallery",
    _SCHEDULE_                                  = "schedule",
    _ACTIVITY_                                  = "activity",
    _ORGANIZATION_                              = "organization",
    _FAQ_                                       = "faq",
    _SYSTEM_                                    = "system",
    _CHANGELOG_                                 = "changelog",
    _DASHBOARD_MESSAGES_                        = "dashboard",
    _DASHBOARD_EVENT_SETTINGS_MODAL_MESSAGES_   = "dashboard-event-settings-modal",
    _SPEAKER_REGISTER_MODAL_MESSAGES_           = "speaker-register-modal",
    _NAVBAR_MESSAGES_                           = "navbar",
    _SPEAKER_MESSAGES_                          = "spekaers",
    _SPONSORSHIP_MESSAGES_                      = "sponsorship",
    _EVENT_SETTINGS_MESSAGE_                    = "event",
    _TEMPLATE_MESSAGES_                         = "template",
    _CHANGELOG_MESSAGES_                        = "changelog",
    _PROCEEDINGS_MESSAGES_                      = "proceedings",
    _FAQ_MESSAGES_                              = "faq",
    _FOOTER_MESSAGES_                           = "footer",
    _VIDEO_GALLERY_MESSAGES_                    = "video_gallery",
    _PHOTO_GALLERY_MESSAGES_                    = "photo_gallery"

}

export class Config {

    public static readonly DATA_ENTITY:             DataEntity;
    public static readonly REMOTE_CONFIG_PATH:      string = "/remote/data/config";
    public static readonly REMOTE_CONTENT_PATH:     string = "/remote/data/content/";
    public static readonly LOCAL_MESSAGES_PATH:     string = "/local/data/messages/";
    public static readonly LOCAL_CONFIG_PATH:       string = "/local/data/conf/";
    public static readonly LOCAL_RECEPTOR_SERVER:   string = "/local/ext/php/receptor.php";
    public static readonly APPLICATION_HOST:        string = "http://localhost";
    public static readonly APPLICATION_PORT:        string = "8080"

    public static readonly REMOTE_CONTENT_FILES_PATH: Map<DataEntity,string> = new Map([

        [DataEntity._SPEAKER_,          "/remote/data/content/speaker.json"],
        [DataEntity._SPONSORSHIP_,      "/remote/data/content/sponsorship.json"],
        [DataEntity._EVENT_,            "/remote/data/content/event.json"],
        [DataEntity._TEMPLATE_,         "/remote/data/content/template.json"],
        [DataEntity._PROCEEDINGS_,      "/remote/data/content/proceedings.json"],
        [DataEntity._ORGANIZATION_,     "/remote/data/content/organization.json"],
        [DataEntity._VIDEO_GALLERY_,    "/remote/data/content/video_gallery.json"],
        [DataEntity._PHOTO_GALLERY_,    "/remote/data/content/photo_gallery.json"],
        [DataEntity._SCHEDULE_,         "/remote/data/content/schedule.json"],
        [DataEntity._FAQ_,              "/remote/data/content/faq.json"],
        [DataEntity._ACTIVITY_,         "/remote/data/content/activity.json"]

    ]);

    public static readonly REMOTE_CONF_FILES_PATH: Map<DataEntity,string> = new Map([

        [DataEntity._LANGUAGE_,         "/remote/data/config/languages.json"],
        [DataEntity._SYSTEM_,           "/remote/data/config/system.json"],

    ]);

    public static readonly LOCAL_CONF_FILES_PATH: Map<DataEntity,string> = new Map([

        [DataEntity._CHANGELOG_,                                    "/local/data/conf/changelog.json"],
        [DataEntity._DASHBOARD_EVENT_SETTINGS_MODAL_MESSAGES_,      Config.LOCAL_MESSAGES_PATH + "dashboard-event-settings-modal.json"],
        [DataEntity._SPEAKER_REGISTER_MODAL_MESSAGES_,              Config.LOCAL_MESSAGES_PATH + "speaker-register-modal.json"],
        [DataEntity._DASHBOARD_MESSAGES_,                           Config.LOCAL_MESSAGES_PATH + "dashboard.json"],
        [DataEntity._NAVBAR_MESSAGES_,                              Config.LOCAL_MESSAGES_PATH + "navbar.json"],
        [DataEntity._SPEAKER_MESSAGES_,                             Config.LOCAL_MESSAGES_PATH + "speakers.json"],
        [DataEntity._SPONSORSHIP_MESSAGES_,                         Config.LOCAL_MESSAGES_PATH + "sponsorship.json"],
        [DataEntity._EVENT_SETTINGS_MESSAGE_,                       Config.LOCAL_MESSAGES_PATH + "event.json"],
        [DataEntity._TEMPLATE_MESSAGES_,                            Config.LOCAL_MESSAGES_PATH + "template.json"],
        [DataEntity._PROCEEDINGS_MESSAGES_,                         Config.LOCAL_MESSAGES_PATH + "proceedings.json"],
        [DataEntity._FAQ_MESSAGES_,                                 Config.LOCAL_MESSAGES_PATH + "faq.json"],
        [DataEntity._FOOTER_MESSAGES_,                              Config.LOCAL_MESSAGES_PATH + "footer.json"],
        [DataEntity._PHOTO_GALLERY_MESSAGES_,                       Config.LOCAL_MESSAGES_PATH + "photo_gallery.json"],
        [DataEntity._VIDEO_GALLERY_MESSAGES_,                       Config.LOCAL_MESSAGES_PATH + "video_gallery.json"],
        [DataEntity._CHANGELOG_MESSAGES_,                           Config.LOCAL_MESSAGES_PATH + "changelog.json"]

    ]);

    public static async projectStartedStatus() {

        const status = await fetch(Config.REMOTE_CONF_FILES_PATH.get(DataEntity._SYSTEM_))
                            
                            .then(response => response.json())
                            
                            .then(data => data['project-started'])
                            
                            .catch(error => Logger.log(error));
        
        return status;

    }

}