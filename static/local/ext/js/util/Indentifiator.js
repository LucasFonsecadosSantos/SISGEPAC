export class Identificator {
    static generateID() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }
}
//# sourceMappingURL=Indentifiator.js.map