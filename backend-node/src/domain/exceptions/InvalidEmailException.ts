import { DomainException } from "src/domain/exceptions/DomainException";

export class InvalidEmailException extends DomainException {
    constructor(email: string) {
        super(`Invalid email: ${email} is an invalid email.`)
    }
}
