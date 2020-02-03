export class Parser {
    constructor() {
        this.symbols = new Array("{", "}");
    }
    parserSpeaker(data) {
        let size = data.length;
        let openDelimiter = false;
        let closeDelimiter = false;
        for (const c of data) {
            if (c == "{") {
                openDelimiter = true;
            }
            else if (c == "}") {
                if (!openDelimiter)
                    return false;
            }
        }
    }
}
//# sourceMappingURL=Parser.js.map