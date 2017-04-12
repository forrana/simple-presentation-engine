export class Message {
    message: string;
    created: number;
    sender: string;

    constructor(message: string, created: number, sender: string) {
        this.message = message;
        this.created = created;
        this.sender = sender;
    }
}
