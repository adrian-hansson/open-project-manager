import { InvalidIssueNameException } from "src/domain/exceptions/InvalidIssueNameException";
import { ValueObject } from "src/domain/valueObjects/ValueObject";

export class IssueName extends ValueObject<string> {
    private static validate(value: string): void {
        if (
            value.length < 3
        ) {
            throw new InvalidIssueNameException(value);
        }
    }

    public static create(value: string): IssueName {
        IssueName.validate(value);
        return new IssueName(value);
    }
}
