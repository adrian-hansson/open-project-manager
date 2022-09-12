import { IIssueReference } from "core/types/IIssueReference";
import { IIssueType } from "core/types/IIssueType";
import { IPerson } from "core/types/IPerson";
import { ISprint } from "core/types/ISprint";
import { IStatus } from "core/types/IStatus";
import { IRelease } from "./IRelease";
import { ITeam } from "./ITeam";

export interface IIssue {
    id: number;
    projectId: number;
    url?: string;

    title: string;
    description?: string;
    type: IIssueType;
    status: IStatus;
    sprint?: ISprint;
    release?: IRelease;
    team?: ITeam;

    timeEstimatedOriginal?: number;
    timeEstimated?: number;
    timeSpent?: number;
    timeRemaining?: number;

    assignee?: IPerson;
    reporter?: IPerson;
    createdBy?: IPerson;
    updatedBy?: IPerson;

    dateCreated?: Date;
    dateUpdated?: Date;
    dateStarted?: Date;
    dateDue?: Date;
    dateCompleted?: Date;

    parent?: IIssueReference;
    children?: IIssueReference[];

    tags: string[];
}
