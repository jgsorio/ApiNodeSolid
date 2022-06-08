export interface IAddress {
    name: string;
    email: string;
}

export interface IMessage {
    to: IAddress;
    from: IAddress;
    subject: string;
    message: string;
}

export interface IEmailProvider {
    sendEmail(message: IMessage): Promise<void>;
}