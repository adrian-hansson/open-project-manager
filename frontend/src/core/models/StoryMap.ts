import { IIssue } from "core/types/IIssue";
import { IIssueType } from "core/types/IIssueType";
import { IProject } from "core/types/IProject";

export class StoryMapGroupModel {
    public readonly children: StoryMapGroupModel[];
    public readonly width: number;
    public readonly isInVerticalStack: boolean;

    constructor(
        public readonly issue: IIssue,
        project: IProject,
        private topIssueLevel: number,
        private bottomIssueLevel: number
    ) {
        // Init children
        this.children = project.issues
            .filter(childIssue => childIssue.parent?.id === this.issue.id)
            .map(childIssue => new StoryMapGroupModel(childIssue, project, topIssueLevel, bottomIssueLevel));
        
        // Init isInVerticalStack
        this.isInVerticalStack = this.issue.type.level === this.bottomIssueLevel;

        // Init width
        if (this.children.length === 0 || this.isInVerticalStack || this.issue.type.level === this.bottomIssueLevel + 1) {
            this.width = 0;
        } else {
            this.width = this.children.length - 1 + this.children
                .map(childIssue => {
                    return childIssue.width;
                })
                .reduce((previous, current) => previous + current);
        }
    }
}

export class StoryMapModel {
    public readonly groups: StoryMapGroupModel[];

    constructor(
        project: IProject
    ) {
        const sortedIssueTypes: IIssueType[] = project.issues
            .map(issue => issue.type)
            .sort((a, b) => b.level - a.level);

        const topIssueLevel: number = sortedIssueTypes[0].level;
        const bottomIssueLevel: number = sortedIssueTypes[sortedIssueTypes.length - 1].level;

        const topLevelIssues: IIssue[] = project.issues
            .filter(issue => issue.type.id === sortedIssueTypes[0].id);
        
        this.groups = topLevelIssues
            .map(topLevelIssue => new StoryMapGroupModel(topLevelIssue, project, topIssueLevel, bottomIssueLevel));
        
        console.log(this);
    }
}
