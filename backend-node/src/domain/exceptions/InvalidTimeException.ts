import { DomainException } from "src/domain/exceptions/DomainException";

export class InvalidTimeException extends DomainException {
    constructor(time: number) {
        super(`Invalid time: ${time} is an invalid time.`)
    }
}
