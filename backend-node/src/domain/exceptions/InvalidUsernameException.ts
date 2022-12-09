import { DomainException } from "src/domain/exceptions/DomainException";

export class InvalidUsernameException extends DomainException {
    constructor(username: string) {
        super(`Invalid username: ${username} is an invalid username.`)
    }
}
