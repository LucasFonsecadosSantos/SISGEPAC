import { DateHandler } from "./DateHandler.js";
export class Logger {
    static log(message, title) {
        console.log('SISGEPAC LOG: [' + ((title) ? title : "APP_LOG") + " | " + DateHandler.getDateTime() + "]: " + message);
    }
    static monitoring(title, message, event) {
        console.log("[MONITOR] => [" + message + "]" + event);
    }
}
//# sourceMappingURL=Logger.js.map