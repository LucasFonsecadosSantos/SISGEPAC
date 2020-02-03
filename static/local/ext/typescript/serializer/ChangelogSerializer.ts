export class ChangelogSerializer {

    public static serializer(id: string, author: string, date: string, changes: Array<string>, type: string): Object {

        return {
            "id": id,
            "author": (author) ? author : "Não informado.",
            "date": date,
            "changes": changes,
            "type": type
        };

    }

}