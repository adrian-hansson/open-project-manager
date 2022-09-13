import { IIssue } from "core/types/IIssue";
import { INamedEntity } from "core/types/INamedEntity";

export interface ISwimlane {
    header: INamedEntity;
    issues: IIssue[];
}
