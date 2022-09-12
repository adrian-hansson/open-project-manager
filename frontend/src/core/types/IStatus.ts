import { INamedEntity } from "core/types/INamedEntity";

export interface IStatus extends INamedEntity {
    value: number;
    isCompleted?: boolean;
    isStarted?: boolean;
    isBlocked?: boolean;
}
