export class Exception extends Error {
    constructor(message, name) {
        super();
        this.message = message;
        this.name = name;
        //this.stack = <call stack>;
        // if ('captureStackTrace' in Error) {
        //     Error.captureStackTrace(this, Exception);
        // } else {
        //     this.stack = (new Error()).stack;
        // }
    }
}
//# sourceMappingURL=Exception.js.map