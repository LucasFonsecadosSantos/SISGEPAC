var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Logger } from './../util/Logger.js';
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
    DataEntity["_FAQ_"] = "faq";
    DataEntity["_SYSTEM_"] = "system";
    DataEntity["_CHANGELOG_"] = "changelog";
    DataEntity["_DASHBOARD_MESSAGES_"] = "dashboard";
    DataEntity["_DASHBOARD_EVENT_SETTINGS_MODAL_MESSAGES_"] = "dashboard-event-settings-modal";
    DataEntity["_SPEAKER_REGISTER_MODAL_MESSAGES_"] = "speaker-register-modal";
    DataEntity["_NAVBAR_MESSAGES_"] = "navbar";
    DataEntity["_SPEAKER_MESSAGES_"] = "spekaers";
    DataEntity["_SPONSORSHIP_MESSAGES_"] = "sponsorship";
    DataEntity["_EVENT_SETTINGS_MESSAGE_"] = "event";
    DataEntity["_TEMPLATE_MESSAGES_"] = "template";
    DataEntity["_CHANGELOG_MESSAGES_"] = "changelog";
    DataEntity["_PROCEEDINGS_MESSAGES_"] = "proceedings";
    DataEntity["_FAQ_MESSAGES_"] = "faq";
    DataEntity["_FOOTER_MESSAGES_"] = "footer";
    DataEntity["_VIDEO_GALLERY_MESSAGES_"] = "video_gallery";
    DataEntity["_PHOTO_GALLERY_MESSAGES_"] = "photo_gallery";
})(DataEntity || (DataEntity = {}));
export class Config {
    static projectStartedStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield fetch(Config.REMOTE_CONF_FILES_PATH.get(DataEntity._SYSTEM_))
                .then(response => response.json())
                .then(data => data['project-started'])
                .catch(error => Logger.log(error));
            return status;
        });
    }
}
Config.REMOTE_CONFIG_PATH = "/remote/data/config";
Config.REMOTE_CONTENT_PATH = "/remote/data/content/";
Config.LOCAL_MESSAGES_PATH = "/local/data/messages/";
Config.LOCAL_CONFIG_PATH = "/local/data/conf/";
Config.LOCAL_RECEPTOR_SERVER = "/local/ext/php/receptor.php";
Config.APPLICATION_HOST = "http://localhost";
Config.APPLICATION_PORT = "8080";
Config.REMOTE_CONTENT_FILES_PATH = new Map([
    [DataEntity._SPEAKER_, "/remote/data/content/speakers.json"],
    [DataEntity._SPONSORSHIP_, "/remote/data/content/sponsorship.json"],
    [DataEntity._EVENT_, "/remote/data/content/event.json"],
    [DataEntity._TEMPLATE_, "/remote/data/content/template.json"],
    [DataEntity._PROCEEDINGS_, "/remote/data/content/proceedings.json"],
    [DataEntity._ORGANIZATION_, "/remote/data/content/organization.json"],
    [DataEntity._VIDEO_GALLERY_, "/remote/data/content/video_gallery.json"],
    [DataEntity._PHOTO_GALLERY_, "/remote/data/content/photo_gallery.json"],
    [DataEntity._SCHEDULE_, "/remote/data/content/schedule.json"],
    [DataEntity._FAQ_, "/remote/data/content/faq.json"],
    [DataEntity._ACTIVITY_, "/remote/data/content/activity.json"]
]);
Config.REMOTE_CONF_FILES_PATH = new Map([
    [DataEntity._LANGUAGE_, "/remote/data/config/languages.json"],
    [DataEntity._SYSTEM_, "/remote/data/config/system.json"],
]);
Config.LOCAL_CONF_FILES_PATH = new Map([
    [DataEntity._CHANGELOG_, "/local/data/conf/changelog.json"],
    [DataEntity._DASHBOARD_EVENT_SETTINGS_MODAL_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "dashboard-event-settings-modal.json"],
    [DataEntity._SPEAKER_REGISTER_MODAL_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "speaker-register-modal.json"],
    [DataEntity._DASHBOARD_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "dashboard.json"],
    [DataEntity._NAVBAR_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "navbar.json"],
    [DataEntity._SPEAKER_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "speakers.json"],
    [DataEntity._SPONSORSHIP_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "sponsorship.json"],
    [DataEntity._EVENT_SETTINGS_MESSAGE_, Config.LOCAL_MESSAGES_PATH + "event.json"],
    [DataEntity._TEMPLATE_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "template.json"],
    [DataEntity._PROCEEDINGS_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "proceedings.json"],
    [DataEntity._FAQ_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "faq.json"],
    [DataEntity._FOOTER_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "footer.json"],
    [DataEntity._PHOTO_GALLERY_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "photo_gallery.json"],
    [DataEntity._VIDEO_GALLERY_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "video_gallery.json"],
    [DataEntity._CHANGELOG_MESSAGES_, Config.LOCAL_MESSAGES_PATH + "changelog.json"]
]);
//# sourceMappingURL=Config.js.map