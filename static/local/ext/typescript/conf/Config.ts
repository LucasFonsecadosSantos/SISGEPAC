export enum DataEntity {

    _SPEAKER_           = "speaker",
    _SPONSORSHIP_       = "sponsorship",
    _EVENT_             = "event",
    _TEMPLATE_          = "template",
    _LANGUAGE_          = "language",
    _PROCEEDINGS_       = "proceedings",
    _PHOTO_GALLERY_     = "gallery_gallery",
    _VIDEO_GALLERY_     = "video_gallery",
    _SCHEDULE_          = "schedule",
    _ACTIVITY_          = "activity",
    _ORGANIZATION_      = "organization"

}

export class Config {

    public static readonly DATA_ENTITY:         DataEntity;
    public static readonly REMOTE_CONFIG_PATH:  string = "/remote/data/config/";
    public static readonly REMOTE_CONTENT_PATH: string = "/remote/data/content/";
    public static readonly LOCAL_MESSAGES_PATH: string = "/local/data/messages/messages.json";
    public static readonly LOCAL_CONFIG_PATH:   string = "/local/data/config/";

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
        [DataEntity._ACTIVITY_,         "/remote/data/content/activity.json"],
        [DataEntity._LANGUAGE_,         "/remote/data/config/language.json"]

    ]);

}