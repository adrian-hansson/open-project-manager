import { IUUIDAdapter } from "src/domain/adapters/IUUIDAdapter";

export class UUID implements IUUIDAdapter {
    randomUUID(): string {
        return crypto.randomUUID();
    }
}
