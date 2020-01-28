import { DataEntity, Config } from '../../conf/Config.js';

export class MessageModel {

    constructor() {}

    public async all(): Object {

        console.log("heelo")

        const messages = await fetch(Config.LOCAL_MESSAGES_PATH)

                            .then(response => response.json())

                            .then(data => data);

        console.log(Promise.resolve(messages));
        return messages;

    }

}