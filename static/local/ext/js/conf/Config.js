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
    DataEntity["_SYSTEM_"] = "system";
    DataEntity["_CHANGELOG_"] = "changelog";
    DataEntity["_DASHBOARD_MESSAGES_"] = "messages";
    DataEntity["_NAVBAR_MESSAGES_"] = "navbar";
})(DataEntity || (DataEntity = {}));
export class Config {
}
Config.REMOTE_CONFIG_PATH = "/remote/data/config";
Config.REMOTE_CONTENT_PATH = "/remote/data/content/";
Config.LOCAL_MESSAGES_PATH = "/local/data/messages/";
Config.LOCAL_CONFIG_PATH = "/local/data/conf/";
Config.LOCAL_RECEPTOR_SERVER = "/local/ext/php/receptor.php";
Config.APPLICATION_HOST = "http://localhost";
Config.APPLICATION_PORT = "8080";
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
    [DataEntity._ACTIVITY_, "/remote/data/content/activity.json"]
]);
Config.REMOTE_CONF_FILES_PATH = new Map([
    [DataEntity._LANGUAGE_, "/remote/data/config/languages.json"],
    [DataEntity._SYSTEM_, "/remote/data/config/system.json"],
]);
Config.LOCAL_CONF_FILES_PATH = new Map([
    [DataEntity._CHANGELOG_, "/local/data/conf/changelog.json"],
    [DataEntity._DASHBOARD_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "dashboard-event-settings-modal.json"],
    [DataEntity._NAVBAR_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "navbar.json"]
]);
//# sourceMappingURL=Config.js.map