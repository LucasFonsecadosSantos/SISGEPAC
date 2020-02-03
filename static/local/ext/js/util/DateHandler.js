export class DateHandler {
    static getDateTime() {
        return new Date().toLocaleString();
    }
    static getDateMonth() {
        let date = new Date();
        return (date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
    }
}
//# sourceMappingURL=DateHandler.js.map