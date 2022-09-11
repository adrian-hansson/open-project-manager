export abstract class ValueObject<T> {
    protected constructor(public readonly value: T) {}

    public equals(otherValueObject: ValueObject<T>): boolean {
        return this.value == otherValueObject.value;
    }
}
