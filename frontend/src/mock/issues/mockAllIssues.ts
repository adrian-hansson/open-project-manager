import { DefaultIssueTypeIds } from "core/enums/DefaultIssueTypeIds";
import { IIssue } from "core/types/IIssue";
import { IIssueType } from "core/types/IIssueType";
import { IPerson } from "core/types/IPerson";
import { IProject } from "core/types/IProject";
import { IRelease } from "core/types/IRelease";
import { ISprint } from "core/types/ISprint";
import { IStatus } from "core/types/IStatus";
import { ITeam } from "core/types/ITeam";
import { getRandomElementFromArray } from "shared/utils/getRandomElementFromArray";
import { getRangeOfNumbers } from "shared/utils/getRangeOfNumbers";

export function mockText(): string {
    return new Array(5).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36);});
}

export function mockAllPeople(): IPerson[] {
    return getRangeOfNumbers(1, 50)
        .map(id => ({
            id: id,
            title: `Person ${id}`
        }));
}

export function mockAllTeams(): ITeam[] {
    return getRangeOfNumbers(1, 6)
        .map(id => ({
            id: id,
            title: `Team ${id}`
        }));
}

export function mockAllSprints(): ISprint[] {
    return getRangeOfNumbers(1, 16)
        .map(id => ({
            id: id,
            title: `Sprint ${id}`,
            startDate: new Date(),
            endDate: new Date()
        }));
}

export function mockAllReleases(): IRelease[] {
    return getRangeOfNumbers(1, 16)
        .map((id, i) => ({
            id: id,
            title: `Release ${id}`,
            date: new Date(
                (new Date()).getFullYear() + i,
                (new Date()).getMonth(),
                (new Date()).getDay()
            ),
        }));
}

export function mockAllIssueTypes(): IIssueType[] {
    return [
        {
            id: DefaultIssueTypeIds.Epic,
            title: 'Epic',
            level: 2
        },
        {
            id: DefaultIssueTypeIds.UserStory,
            title: 'User story',
            level: 1
        },
        {
            id: DefaultIssueTypeIds.Subtask,
            title: 'Subtask',
            level: 0
        }
    ];
}

export function mockIssueType(): IIssueType {
    const random: number = Math.random();

    if (random > 0.9) {
        return {
            id: DefaultIssueTypeIds.Epic,
            title: 'Epic',
            level: 2
        }
    } else if (random > 0.6) {
        return {
            id: DefaultIssueTypeIds.UserStory,
            title: 'User story',
            level: 1
        }
    } else {
        return {
            id: DefaultIssueTypeIds.Subtask,
            title: 'Subtask',
            level: 0
        }
    }
}

export function mockAllStatuses(): IStatus[] {
    return [10, 20, 40, 50, 90].map((value, index) => ({
        id: index + 1,
        title: (index + 1) + " - Status",
        value: value
    }));
}

export function mockStatus(): IStatus {
    return getRandomElementFromArray<IStatus>(mockAllStatuses());
}

export function mockTeam(): ITeam {
    return getRandomElementFromArray<ITeam>(mockAllTeams());
}

export function mockIssue(id: number, type: IIssueType): IIssue {
    const issue: IIssue = {
        id: id,
        title: mockText(),
        projectId: 1,
        type: type,
        status: mockStatus(),
        team: mockTeam(),
        tags: []
    };

    issue.title = issue.type.title + ' ' + issue.id + ': ' + issue.title;

    if (issue.type.level === 1) {
        issue.sprint = getRandomElementFromArray(mockAllSprints());
    }

    if (issue.type.level === 0) {
        const random: number = Math.random();
    
        if (random > 0.65) {
            issue.tags.push('documentation');
        } else if (random > 0.30) {
            issue.tags.push('implementation');
        } else {
            issue.tags.push('test');
        }
    }

    return issue;
}

export function mockIssueParentage(issues: IIssue[], level: number): void {
    issues
        .filter(issue => issue.type.level === level)
        .forEach(childIssue => {
            const parentIssue: IIssue = getRandomElementFromArray<IIssue>(
                issues.filter(issue => issue.type.level === level + 1)
            );

            childIssue.parent = {
                id: parentIssue.id,
                title: parentIssue.title,
                status: parentIssue.status,
                type: parentIssue.type
            };

            if (parentIssue.children) {
                parentIssue.children.push({
                    id: childIssue.id,
                    title: childIssue.title,
                    status: childIssue.status,
                    type: childIssue.type
                });
            } else {
                parentIssue.children = [{
                    id: childIssue.id,
                    title: childIssue.title,
                    status: childIssue.status,
                    type: childIssue.type
                }];
            }

            if (parentIssue.sprint) {
                childIssue.sprint = parentIssue.sprint;
            }
        });
}

export function mockAllIssues(): IIssue[] {
    const issues: IIssue[] = getRangeOfNumbers(1, 150).map(id => {
        return mockIssue(
            id,
            mockIssueType()
        );
    });

    mockIssueParentage(issues, 0);
    mockIssueParentage(issues, 1);

    return issues;
}

export function mockProject(id: string): IProject {
    return {
        id: id,
        issues: mockAllIssues(),
        issueTypes: mockAllIssueTypes(),
        statuses: mockAllStatuses(),
        people: mockAllPeople(),
        teams: mockAllTeams(),
        sprints: mockAllSprints(),
        releases: mockAllReleases()
    };
}
