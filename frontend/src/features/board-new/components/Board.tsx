import { BoardColumnTypes } from "core/enums/BoardColumnsTypes";
import { SwimlaneTypeId } from "core/enums/BoardSwimlaneTypes";
import { IIssue } from "core/types/IIssue";
import { IIssueType } from "core/types/IIssueType";
import { INamedEntity } from "core/types/INamedEntity";
import { IPerson } from "core/types/IPerson";
import { IProject } from "core/types/IProject";
import { ISprint } from "core/types/ISprint";
import { IStatus } from "core/types/IStatus";
import { ITeam } from "core/types/ITeam";
import { useState } from "react";
import Grid from "shared/components/grid/Grid";
import Multiselect, { MultiselectOption } from "shared/components/Multiselect";
import './Board.scss';
import { BoardItem } from "./BoardItem";
import { Filter } from "./Filter";

export interface IBoardProps {
    project: IProject;
    // issues: IIssue[];
    // issueTypes: IIssueType[];
    // statuses: IStatus[];
    // sprints: ISprint[];
    // teams: ITeam[];
    // people: IPerson[];
}

export function mapEnumToMultiselectOptions(enumToMap: any): MultiselectOption[] {
    return Object.keys(enumToMap)
    .filter(key => isNaN(key as unknown as number))
    .map((key: string) => {
        console.log('key', key, 'value', enumToMap[key as keyof typeof enumToMap]);
        return {
            id: SwimlaneTypeId[key as keyof typeof SwimlaneTypeId],
            title: key,
            value: key,
            selected: false // swimlaneType === enumToMap[key as keyof typeof enumToMap]
        };
    });
}

export function Board(props: IBoardProps) {
    console.log('issues', props.project.issues);
    const [project, setProject] = useState<IProject>(props.project);

    // // FILTER
    // const [search, setSearch] = useState<string | undefined>('Subtask 3');
    // const [labels, setLabels] = useState<string | undefined>(undefined);
    // const [issueTypes, setIssueTypes] = useState<IIssueType[]>(props.project.issueTypes.length > 1 ? [props.project.issueTypes[0]] : []);
    // const [teams, setTeams] = useState<ITeam[]>(props.project.teams.length > 1 ? [props.project.teams[0]] : []);
    // const [sprints, setSprints] = useState<ISprint[]>(props.project.sprints.length > 1 ? [props.project.sprints[0]] : []);

    // let filteredIssues: IIssue[] = props.project.issues.filter(issue => {
    //     return (search !== undefined && issue.title.includes(search)) &&
    //            (labels && !((labels || '').split(',').map(label => label.trim()).map(label => issue.tags.includes(label)).some(hasLabel => hasLabel))) &&
    //            (issueTypes.length > 0 && issueTypes.some(issueType => issueType.id === issue.type.id)) &&
    //            (teams.length > 0 && teams.some(team => team.id === issue.team?.id)) &&
    //            (sprints.length > 0 && sprints.some(sprint => sprint.id === issue.sprint?.id));
    // });

    // SWIMLANES
    const [swimlaneType, setSwimlaneType] = useState<SwimlaneTypeId>(SwimlaneTypeId.IssueType);
    const [swimlaneIssueType, setSwimlaneIssueType] = useState<IIssueType | undefined>(
        project.issueTypes.length > 1 ? project.issueTypes[1] : (project.issueTypes.length > 0 ? project.issueTypes[0] : undefined)
    );
    const [swimlaneAssignee, setSwimlaneAssignee] = useState<IPerson | undefined>(undefined);
    const [swimlaneTeams, setSwimlaneTeams] = useState<ITeam[]>(project.teams);
    const [hideEmptySwimlanes, setHideEmptySwimlanes] = useState<boolean>(false);

    let swimlanes: INamedEntity[][] = [];
    let issuesToUseAsSwimlanes: IIssue[] = [];

    if (swimlaneType === SwimlaneTypeId.IssueType) {
        issuesToUseAsSwimlanes = props.project.issues.filter(issue => issue.type.id === swimlaneIssueType?.id);
        swimlanes = issuesToUseAsSwimlanes.map(swimlaneIssue => ([
            swimlaneIssue,
            ...project.issues.filter(issue => issue.parent?.id === swimlaneIssue.id)
        ]));
        console.log('swimlanes', swimlanes);
    } else if (swimlaneType === SwimlaneTypeId.Team) {
        swimlanes = project.teams.map(team => ([
            team,
            ...project.issues.filter(issue => issue.team?.id === team.id)
        ]));
    }

    // COLUMNS
    const [columnType, setColumnType] = useState<BoardColumnTypes>(BoardColumnTypes.Status);
    const [columnStatus, setColumnStatus] = useState<IStatus | undefined>(undefined);
    const [columnSprint, setColumnSprint] = useState<ISprint | undefined>(undefined);

    return (
        <div className="board">
            <header>
                <form className='filter'>
                    <Filter
                        project={props.project}
                        setProject={setProject} />
                    <fieldset>
                        <legend>Swimlanes</legend>
                        <Multiselect
                            options={mapEnumToMultiselectOptions(SwimlaneTypeId).map(option => ({
                                id: option.id,
                                title: option.title,
                                value: option.value,
                                selected: swimlaneType === SwimlaneTypeId[option.title as keyof typeof SwimlaneTypeId]
                            }))}
                            onValueChanges={((_, selected) => setSwimlaneType(SwimlaneTypeId[selected?.title as keyof typeof SwimlaneTypeId]))}
                            isSingleSelect
                        />
                        {swimlaneType === SwimlaneTypeId.IssueType &&
                            <Multiselect
                                options={props.project.issueTypes.map(issueType => ({
                                    id: issueType.id,
                                    title: issueType.title,
                                    value: issueType,
                                    selected: issueType.id === swimlaneIssueType?.id
                                }))}
                                onValueChanges={((_o, selected, value) => setSwimlaneIssueType(value))}
                                isSingleSelect
                            />
                        }
                        {swimlaneType === SwimlaneTypeId.Team &&
                            <Multiselect
                                options={props.project.teams.map(team => ({
                                    id: team.id,
                                    title: team.title,
                                    value: team,
                                    selected: true //team.id === swimlaneTeam?.id
                                }))}
                                onValueChanges={((selections) => {
                                    const selectedTeams: ITeam[] = [];
                                    selections.forEach(selection => {
                                        if (selection.selected) {
                                            const selectedTeam: ITeam | undefined = props.project.teams
                                                .find(team => team.id === selection.id);

                                            if (selectedTeam) {
                                                selectedTeams.push(selectedTeam);
                                            }
                                        }
                                    });
                                    setSwimlaneTeams(selectedTeams);
                                })}
                            />
                        }
                    </fieldset>
                    <fieldset>
                        <legend>Columns</legend>
                    </fieldset>
                    {/* {swimlaneType === BoardSwimlaneTypes.Assignee &&
                        <Multiselect
                            options={props.people.map(person => ({
                                id: person.id,
                                title: person.title,
                                value: person,
                                selected: person.id === swimlaneAssignee?.id
                            }))}
                        />
                    } */}
                </form>
            </header>
            <Grid
                id={'board-grid'}
                hideEmptyRows={false}
                grid={swimlanes.map(swimlane => swimlane.map(swimlaneItem => <BoardItem issue={swimlaneItem as IIssue} />))}
            />
            {/* {swimlanes.map(swimlane => (
                <div className="swimlane">
                    {swimlane.map(item => <span>[{item.id + " " + item.title}]</span>)}
                </div>
            ))} */}
            {/* {JSON.stringify(props.issues)} */}
        </div>
    );
}
