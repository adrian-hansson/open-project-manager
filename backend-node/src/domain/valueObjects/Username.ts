import { InvalidUsernameException } from "src/domain/exceptions/InvalidUsernameException";
import { ValueObject } from "src/domain/valueObjects/ValueObject";

export class Username extends ValueObject<string> {
    private static validate(value: string): void {
        if (
            value.length < 3
        ) {
            throw new InvalidUsernameException(value);
        }
    }

    public static create(value: string): Username {
        Username.validate(value);
        return new Username(value);
    }
}
