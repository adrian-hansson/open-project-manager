export abstract class Entity {
    constructor(
        protected readonly id
    ) {}

    public equals(entity: Entity): boolean {
        return this.id === entity.id;
    }
}
