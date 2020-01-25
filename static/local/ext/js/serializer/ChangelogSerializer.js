export class ChangelogSerializer {
    static serializer(id, author, date, changes, type) {
        return {
            "id": id,
            "author": (author) ? author : "Não informado.",
            "date": date,
            "changes": changes,
            "type": type
        };
    }
}
//# sourceMappingURL=ChangelogSerializer.js.map