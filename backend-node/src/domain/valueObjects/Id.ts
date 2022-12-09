import { InvalidIdException } from "src/domain/exceptions/InvalidIdException";
import { ValueObject } from "src/domain/valueObjects/ValueObject";
import { IUUIDAdapter } from "../adapters/IUUIDAdapter";

export class Id extends ValueObject<number | string> {
    private static validate(value: number | string): void {
        if (
            (value as number) < 0 // TODO: fix this to make more sense and check for NaN first.
        ) {
            throw new InvalidIdException(value);
        }
    }

    public static createExisting(value: number | string): Id {
        Id.validate(value); // TODO: implement a proper check that also somehow considers current project IDs

        return new Id(value);
    }

    public static createNew(uuid: IUUIDAdapter): Id {
        const value: string = uuid.randomUUID();

        return new Id(value); // TODO: implement
    }
}
