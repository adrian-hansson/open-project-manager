import { DomainException } from "src/domain/exceptions/DomainException";

export class InvalidIdException extends DomainException {
    constructor(id: number | string) {
        super(`Invalid id: ${id} is an invalid id.`)
    }
}
