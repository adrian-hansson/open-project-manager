import { IIssue } from "./IIssue";

export interface IStoryMapNode {
    issue: IIssue;
    width: number;
    children: IStoryMapNode[];
}

export interface IStoryMap {
    nodes: IStoryMapNode[];
}
