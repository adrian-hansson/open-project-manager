import { IIssue } from "./IIssue";
import { IIssueType } from "./IIssueType";
import { IPerson } from "./IPerson";
import { IRelease } from "./IRelease";
import { ISprint } from "./ISprint";
import { IStatus } from "./IStatus";
import { ITeam } from "./ITeam";

export interface IProject {
    id: string,
    issues: IIssue[];
    issueTypes: IIssueType[];
    statuses: IStatus[];
    people: IPerson[];
    teams: ITeam[];
    sprints: ISprint[];
    releases: IRelease[];
}
