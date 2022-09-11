import { ValueObject } from "src/domain/valueObjects/ValueObject";

export class Description extends ValueObject<string> {
    public static create(value: string): Description {
        return new Description(value);
    }
}
