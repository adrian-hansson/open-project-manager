import { ICommand } from "application/commands/ICommand";

export interface ICommandHandler<T extends ICommand, R = void> {
    handle(command: T): R;
}
