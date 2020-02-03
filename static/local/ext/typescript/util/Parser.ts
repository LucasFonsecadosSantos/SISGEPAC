export class Parser {

    private symbols: Array<string>;

    constructor() {

        this.symbols = new Array<string>(
            "{","}"
        );

    }

    public parserSpeaker(data: string): boolean {

        let size = data.length;

        let openDelimiter:  boolean = false;
        let closeDelimiter: boolean = false;

        for (const c of data) {

            if (c == "{") {

                openDelimiter = true;

            } else if (c == "}") {
                if (!openDelimiter) return false;
            }

        }

    }

}