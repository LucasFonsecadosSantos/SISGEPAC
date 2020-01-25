export class DateHandler {

    public static getDateTime(): string {

        return new Date().toLocaleString();

    }

    public static getDateMonth(): string {

        let date = new Date();
        return (date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());

    }

}