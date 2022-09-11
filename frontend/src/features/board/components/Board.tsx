import { BoardColumnTypes } from "core/enums/BoardColumnsTypes";
import { BoardSwimlaneTypes } from "core/enums/BoardSwimlaneTypes";
import { IIssue } from "core/types/IIssue";
import { IIssueType } from "core/types/IIssueType";
import { INamedEntity } from "core/types/INamedEntity";
import { IPerson } from "core/types/IPerson";
import { ISprint } from "core/types/ISprint";
import { IStatus } from "core/types/IStatus";
import { ITeam } from "core/types/ITeam";
import { useState } from "react";
import Multiselect, { MultiselectOption } from "shared/components/Multiselect";

export interface IBoardProps {
    issues: IIssue[];
    issueTypes: IIssueType[];
    statuses: IStatus[];
    sprints: ISprint[];
    teams: ITeam[];
    people: IPerson[];
}

export function mapEnumToMultiselectOptions(enumToMap: any): MultiselectOption[] {
    return Object.keys(enumToMap)
    .filter(key => isNaN(key as unknown as number))
    .map((key: string) => {
        console.log('key', key, 'value', enumToMap[key as keyof typeof enumToMap]);
        return {
            id: BoardSwimlaneTypes[key as keyof typeof BoardSwimlaneTypes],
            title: key,
            value: key,
            selected: false // swimlaneType === enumToMap[key as keyof typeof enumToMap]
        };
    });
}

export function Board(props: IBoardProps) {
    console.log('issues', props.issues);

    // FILTER
    const [search, setSearch] = useState<string | undefined>('Subtask 3');
    const [labels, setLabels] = useState<string | undefined>(undefined);
    const [issueTypes, setIssueTypes] = useState<IIssueType[]>(props.issueTypes.length > 1 ? [props.issueTypes[0]] : []);
    const [teams, setTeams] = useState<ITeam[]>(props.teams.length > 1 ? [props.teams[0]] : []);
    const [sprints, setSprints] = useState<ISprint[]>(props.sprints.length > 1 ? [props.sprints[0]] : []);

    let filteredIssues: IIssue[] = props.issues.filter(issue => {
        return (search !== undefined && issue.title.includes(search)) &&
               (labels && !((labels || '').split(',').map(label => label.trim()).map(label => issue.tags.includes(label)).some(hasLabel => hasLabel))) &&
               (issueTypes.length > 0 && issueTypes.some(issueType => issueType.id === issue.type.id)) &&
               (teams.length > 0 && teams.some(team => team.id === issue.team?.id)) &&
               (sprints.length > 0 && sprints.some(sprint => sprint.id === issue.sprint?.id));
    });

    // SWIMLANES
    const [swimlaneType, setSwimlaneType] = useState<BoardSwimlaneTypes>(BoardSwimlaneTypes.IssueType);
    const [swimlaneIssueType, setSwimlaneIssueType] = useState<IIssueType | undefined>(undefined);
    const [swimlaneAssignee, setSwimlaneAssignee] = useState<IPerson | undefined>(undefined);
    const [swimlaneTeam, setSwimlaneTeam] = useState<ITeam | undefined>(undefined);
    const [hideEmptySwimlanes, setHideEmptySwimlanes] = useState<boolean>(false);

    let swimlanes: INamedEntity[][] = [];
    let issuesToUseAsSwimlanes: IIssue[] = [];

    if (swimlaneType === BoardSwimlaneTypes.IssueType) {
        issuesToUseAsSwimlanes = props.issues.filter(issue => issue.type.id === swimlaneIssueType?.id);
        swimlanes = issuesToUseAsSwimlanes.map(swimlaneIssue => ([
            swimlaneIssue,
            ...filteredIssues.filter(issue => issue.parent?.id === swimlaneIssue.id)
        ]));
        console.log('swimlanes', swimlanes);
    }

    // COLUMNS
    const [columnType, setColumnType] = useState<BoardColumnTypes>(BoardColumnTypes.Status);
    const [columnStatus, setColumnStatus] = useState<IStatus | undefined>(undefined);
    const [columnSprint, setColumnSprint] = useState<ISprint | undefined>(undefined);

    return (
        <div className="board">
            <div className="filter">
                <Multiselect
                    options={mapEnumToMultiselectOptions(BoardSwimlaneTypes).map(option => ({
                        id: option.id,
                        title: option.title,
                        value: option.value,
                        selected: swimlaneType === BoardSwimlaneTypes[option.title as keyof typeof BoardSwimlaneTypes]
                    }))}
                    onValueChanges={((_, selected) => setSwimlaneType(BoardSwimlaneTypes[selected?.title as keyof typeof BoardSwimlaneTypes]))}
                    isSingleSelect
                />
                {swimlaneType === BoardSwimlaneTypes.IssueType &&
                    <Multiselect
                        options={props.issueTypes.map(issueType => ({
                            id: issueType.id,
                            title: issueType.title,
                            value: issueType,
                            selected: issueType.id === swimlaneIssueType?.id
                        }))}
                        onValueChanges={((_o, selected, value) => setSwimlaneIssueType(value))}
                        isSingleSelect
                    />
                }
                {/* {swimlaneType === BoardSwimlaneTypes.Team &&
                    <Multiselect
                        options={props.teams.map(team => ({
                            id: team.id,
                            title: team.title,
                            value: team,
                            selected: team.id === swimlaneTeam?.id
                        }))}
                    />
                }
                {swimlaneType === BoardSwimlaneTypes.Assignee &&
                    <Multiselect
                        options={props.people.map(person => ({
                            id: person.id,
                            title: person.title,
                            value: person,
                            selected: person.id === swimlaneAssignee?.id
                        }))}
                    />
                } */}
            </div>
            {swimlanes.map(swimlane => (
                <div className="swimlane">
                    {swimlane.map(item => <span>[{item.id + " " + item.title}]</span>)}
                </div>
            ))}
            {/* {JSON.stringify(props.issues)} */}
        </div>
    );
}
