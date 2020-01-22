export var DataEntity;
(function (DataEntity) {
    DataEntity["_SPEAKER_"] = "speaker";
    DataEntity["_SPONSORSHIP_"] = "sponsorship";
    DataEntity["_EVENT_"] = "event";
    DataEntity["_TEMPLATE_"] = "template";
    DataEntity["_LANGUAGE_"] = "language";
    DataEntity["_PROCEEDINGS_"] = "proceedings";
    DataEntity["_PHOTO_GALLERY_"] = "gallery_gallery";
    DataEntity["_VIDEO_GALLERY_"] = "video_gallery";
    DataEntity["_SCHEDULE_"] = "schedule";
    DataEntity["_ACTIVITY_"] = "activity";
    DataEntity["_ORGANIZATION_"] = "organization";
})(DataEntity || (DataEntity = {}));
export class Config {
}
Config.REMOTE_CONFIG_PATH = "/remote/data/config/";
Config.REMOTE_CONTENT_PATH = "/remote/data/content/";
Config.LOCAL_MESSAGES_PATH = "/local/data/messages/messages.json";
Config.LOCAL_CONFIG_PATH = "/local/data/config/";
Config.REMOTE_CONTENT_FILES_PATH = new Map([
    [DataEntity._SPEAKER_, "/remote/data/content/speaker.json"],
    [DataEntity._SPONSORSHIP_, "/remote/data/content/sponsorship.json"],
    [DataEntity._EVENT_, "/remote/data/content/event.json"],
    [DataEntity._TEMPLATE_, "/remote/data/content/template.json"],
    [DataEntity._PROCEEDINGS_, "/remote/data/content/proceedings.json"],
    [DataEntity._ORGANIZATION_, "/remote/data/content/organization.json"],
    [DataEntity._VIDEO_GALLERY_, "/remote/data/content/video_gallery.json"],
    [DataEntity._PHOTO_GALLERY_, "/remote/data/content/photo_gallery.json"],
    [DataEntity._SCHEDULE_, "/remote/data/content/schedule.json"],
    [DataEntity._ACTIVITY_, "/remote/data/content/activity.json"],
    [DataEntity._LANGUAGE_, "/remote/data/config/language.json"]
]);
//# sourceMappingURL=Config.js.map