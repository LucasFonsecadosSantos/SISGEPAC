import { Controller }   from "./../../core/Controller.js";
import { SpeakerModel } from "./../model/SpeakerModel.js";
import { MessageModel } from "./../model/MessageModel.js";
import { Logger }       from "../../util/Logger.js";

export class SpeakerController extends Controller {

    private _elements:      Array<HTMLElement>
    private _speakerModel:  SpeakerModel;
    private _messageModel:  MessageModel;
    private _speakerData;
    private _messages;

    constructor(projectStatus: boolean) {

        super(projectStatus);
        this._initializeElements();
        this._getData();
        this._getPageMessages();
        this._getPageContent();

    }

    private _initializeElements(): void {

    }

    private _getData(): void {

        this._messages = this._messageModel.all();
        this._speakerData = this._speakerModel.all();

    }

    private _getPageMessages(): void {

        this._messages

            .then(data => {

            })

            .catch(error => Logger.log(error));

    }

    private _getPageContent(): void {

        this._speakerData

            .then(data => {

            })

            .catch(error => Logger.log(error));

    }

    public search(key: string, value: string): void {

        let speaker = this._speakerModel.find(key, value);

    }


}