import { DateHandler } from "./DateHandler.js";

export class Logger {

    public static log(message: string, title?: string) {

        console.log('SISGEPAC LOG: [' + ((title) ? title : "APP_LOG") + " | " + DateHandler.getDateTime() + "]: " + message);

    }

    public static monitoring(title: string, message: string, event: Event) {

        console.log("[MONITOR] => [" + message + "]" + event);

    }

}