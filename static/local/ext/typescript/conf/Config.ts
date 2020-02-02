export enum DataEntity {

    _SPEAKER_               = "speaker",
    _SPONSORSHIP_           = "sponsorship",
    _EVENT_                 = "event",
    _TEMPLATE_              = "template",
    _LANGUAGE_              = "language",
    _PROCEEDINGS_           = "proceedings",
    _PHOTO_GALLERY_         = "gallery_gallery",
    _VIDEO_GALLERY_         = "video_gallery",
    _SCHEDULE_              = "schedule",
    _ACTIVITY_              = "activity",
    _ORGANIZATION_          = "organization",
    _SYSTEM_                = "system",
    _CHANGELOG_             = "changelog",
    _DASHBOARD_MESSAGES_    = "messages",
    _NAVBAR_MESSAGES_       = "navbar"

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
        [DataEntity._ACTIVITY_,         "/remote/data/content/activity.json"]

    ]);

    public static readonly REMOTE_CONF_FILES_PATH: Map<DataEntity,string> = new Map([

        [DataEntity._LANGUAGE_,         "/remote/data/config/languages.json"],
        [DataEntity._SYSTEM_,           "/remote/data/config/system.json"],

    ]);

    public static readonly LOCAL_CONF_FILES_PATH: Map<DataEntity,string> = new Map([

        [DataEntity._CHANGELOG_,            "/local/data/conf/changelog.json"],
        [DataEntity._DASHBOARD_MESSAGES_,   Config.LOCAL_MESSAGES_PATH + "dashboard-event-settings-modal.json"],
        [DataEntity._NAVBAR_MESSAGES_,      Config.LOCAL_MESSAGES_PATH + "navbar.json"]

    ])

}