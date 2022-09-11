import { INamedEntity } from "core/types/INamedEntity";
import { IIssueType } from "./IIssueType";
import { IStatus } from "./IStatus";

export interface IIssueReference extends INamedEntity {
    type: IIssueType;
    status: IStatus;
}
