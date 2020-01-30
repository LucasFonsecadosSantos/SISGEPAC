import { Exception } from "./../core/Exception.js";

export class InvalidDataKeyException extends Exception {

    constructor(message: string) {

        super(message, 'InvalidDataKeyException');

    }

}