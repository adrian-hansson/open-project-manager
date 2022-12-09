import { IIssue } from "core/types/IIssue";
import { IProject } from "core/types/IProject";
import { ISprint } from "core/types/ISprint";
import { Filter } from "features/board-new/components/Filter";
import { useState } from "react";
import { FilterContainer } from "shared/components/FilterContainer";

export interface IRoadmapProps {
    project: IProject;
}

// function getListOfIssueWithChildren(issue: IIssue, project: IProject): IIssue[] {
//     const children: IIssue[] = project.issues
//         .filter(childIssue => childIssue.id === issue.id)
//         .flatMap(childIssue => getListOfIssueWithChildren(childIssue, project));

//     return [
//         issue,
//         ...children
//     ];
// }

function getStartAndEndSprintForIssueWithChildren(issue: IIssue, sortedIssues: IIssue[]): {
    startSprint: ISprint | undefined;
    endSprint: ISprint | undefined;
} {
    const children: IIssue[] = (issue.children || [])
        .map(childReference => sortedIssues
        .find(child => childReference.id === child.id))
        .filter(child => child !== undefined)
        .sort((a, b) => (b?.sprint?.startDate.getTime() || 0) - (a?.sprint?.startDate.getTime() || 0)) as IIssue[];
    
    // if (children.length !== 0) {
    console.log(children.map(c => c.sprint?.title));
    const startAndEndSprintsForFirstChild = getStartAndEndSprintForIssue(children[children.length - 1], sortedIssues); // TODO: Check we these two are switched.
    const startAndEndSprintsForLastChild = getStartAndEndSprintForIssue(children[0], sortedIssues);

    return { startSprint: startAndEndSprintsForFirstChild.startSprint, endSprint: startAndEndSprintsForLastChild.endSprint };
    // }

    // return { startSprint: issue.sprint, endSprint: issue.sprint };
}

function getStartAndEndSprintForIssue(issue: IIssue, sortedIssues: IIssue[]): {
    startSprint: ISprint | undefined;
    endSprint: ISprint | undefined;
} {
    if (issue.children && issue.children.length > 0) {
        return getStartAndEndSprintForIssueWithChildren(issue, sortedIssues);
    }

    return { startSprint: issue.sprint, endSprint: issue.sprint };
}

export interface IRoadmapRowColumnProps {
    issue: IIssue;
    sprint: ISprint;
    startSprint: ISprint | undefined;
    endSprint: ISprint | undefined;
}

export function RoadmapRowColumn(props: IRoadmapRowColumnProps) {
    let isInActiveSprintRange: boolean = false;
    let isOnLastSprint: boolean = false;
    let isInAnySprint: boolean = false;

    // Check if we are entering the active sprint range for the first time
    if (!isInActiveSprintRange && props.sprint.id === props.startSprint?.id) {
        isInActiveSprintRange = true;
        isInAnySprint = true;
    }

    // Check if we are exiting the active sprint range
    if (isInActiveSprintRange && props.sprint.id === props.endSprint?.id) {
        isOnLastSprint = true;
    } else if(isOnLastSprint) {
        isOnLastSprint = false;
        isInActiveSprintRange = false;
    }

    // TODO: Replace span with a new "IssueBox" component that uses color and title. Should be reused in the StoryBoard component as well.
    return <td>
        {isInActiveSprintRange &&
            <span>
                {props.issue.title}
                <small>
                    [{props.issue.parent?.title}]
                    [({props.startSprint?.title}, {props.endSprint?.title})]
                </small>
            </span>}
    </td>;
}

export interface IRoadmapRowProps {
    issue: IIssue;
    issues: IIssue[];
    sprints: ISprint[];
}

/** A component that represents a single row in the RoadMap for an issue. It also includes rows of all descendants if the issue has any. */
export function RoadmapRow(props: IRoadmapRowProps) {
    let { startSprint, endSprint } = getStartAndEndSprintForIssue(props.issue, props.issues);
    // let isInAnySprint: boolean = false;

    // Only include the row if the issue exists in any sprint
    // if (isInAnySprint) {
        // Return our issue row + any additional rows for possible children on our issue
        return <>
            <tr>
                {props.sprints.map(sprint => <RoadmapRowColumn issue={props.issue} sprint={sprint} startSprint={startSprint} endSprint={endSprint} />)}
            </tr>
            {(props.issue.children && props.issue.children.length > 0) && props.issue.children.map(childReference => {
                const child: IIssue | undefined = props.issues.find(issue => issue.id === childReference.id);

                // Only return a child issue row of the child issue reference actually points to a real issue we have in our list
                if (child) {
                    return <RoadmapRow
                        issue={child}
                        issues={props.issues}
                        sprints={props.sprints} />
                }

                // Otherwise return an empty result
                return <></>;
            })}
        </>;
}

export interface IRoadmapHeadersProps {
    sprints: ISprint[];
}

export function RoadmapHeaders(props: IRoadmapHeadersProps) {
    return <thead>
        <tr>
            {props.sprints.map(sprint => <th>{sprint.title}</th>)}
        </tr>
    </thead>;
}

export interface IRoadmapRowsProps {
    sortedIssues: IIssue[];
    topIssueLevel: number;
    sprints: ISprint[];
}

export function RoadmapRows(props: IRoadmapRowsProps) {
    return <tbody>
        {props.sortedIssues
            .filter(topLevelIssue => topLevelIssue.type.level === props.topIssueLevel)
            .map(topLevelIssue => (
                <RoadmapRow
                    issue={topLevelIssue}
                    issues={props.sortedIssues}
                    sprints={props.sprints}
                />
            ))}
    </tbody>;
}

export function Roadmap(props: IRoadmapProps) {
    const [filteredProject, setFilteredProject] = useState<IProject>(props.project);
    const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);
    const topIssueLevel: number = filteredProject.issueTypes.sort((a, b) => b.level - a.level)[0].level;

    const sortedIssues: IIssue[] = filteredProject.issues.sort((a, b) => (b.sprint?.startDate.getTime() || 0) - (a.sprint?.startDate.getTime() || 0));

    return <div className="storymap">
        <header>
            <FilterContainer>
                <Filter
                    project={props.project}
                    setFilteredProject={setFilteredProject}
                    setIsFilterLoading={setIsFilterLoading}
                    filterSprints={false}
                />
                {isFilterLoading && <div>Loading...</div>}
            </FilterContainer>
        </header>
        <table>
            <RoadmapHeaders
                sprints={filteredProject.sprints}
            />
            <RoadmapRows
                sortedIssues={sortedIssues}
                topIssueLevel={topIssueLevel}
                sprints={filteredProject.sprints}
            />
        </table>
    </div>;
}
