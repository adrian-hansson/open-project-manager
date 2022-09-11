import { DomainException } from "src/domain/exceptions/DomainException";

export class InvalidIssueNameException extends DomainException {
    constructor(issueName: string) {
        super(`Invalid issue name: ${issueName} is an invalid issue name.`)
    }
}
