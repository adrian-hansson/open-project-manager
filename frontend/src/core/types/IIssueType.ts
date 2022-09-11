import { INamedEntity } from "core/types/INamedEntity";

export interface IIssueType extends INamedEntity {
    /** An level of 0 indicates a bottom-level issue, i.e. a work task that can be worked on directly.
     * Higher-level issues depend on their child issues to progress.*/
    level: number;
}
