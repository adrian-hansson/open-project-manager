import { InvalidTimeException } from "src/domain/exceptions/InvalidTimeException";
import { ValueObject } from "src/domain/valueObjects/ValueObject";

export class Time extends ValueObject<number> {
    private static validate(value: number): void {
        if (
            value < 0
        ) {
            throw new InvalidTimeException(value);
        }
    }

    public static create(value: number): Time {
        Time.validate(value);
        return new Time(value);
    }
}
