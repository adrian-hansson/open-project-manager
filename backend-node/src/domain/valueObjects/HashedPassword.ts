import { ValueObject } from "src/domain/valueObjects/ValueObject";

export class Password extends ValueObject<string> {
    public static create(value: string): Password {
        return new Password(value);
    }
}
