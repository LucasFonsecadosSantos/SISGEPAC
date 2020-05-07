export class Helper {

    public static isArray(data: any): boolean {

        return (Object.prototype.toString.call(data) === '[Object Array]');

    }

}