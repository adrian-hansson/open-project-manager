import { ColumnConstants } from "core/constants/BoardColumnConstants";
import { ColumnTypeId } from "core/enums/BoardColumnsTypes";
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

    // SWIMLANES
    const [swimlaneType, setSwimlaneType] = useState<SwimlaneTypeId>(SwimlaneTypeId.IssueType);
    const [swimlaneIssueType, setSwimlaneIssueType] = useState<IIssueType | undefined>(
        project.issueTypes.length > 1 ? project.issueTypes[1] : (project.issueTypes.length > 0 ? project.issueTypes[0] : undefined)
    );
    const [swimlaneAssignee, setSwimlaneAssignee] = useState<IPerson | undefined>(undefined);
    const [swimlaneTeams, setSwimlaneTeams] = useState<ITeam[]>(project.teams);
    const [hideEmptySwimlanes, setHideEmptySwimlanes] = useState<boolean>(false);

    let swimlanesB: { header: INamedEntity, issues: IIssue[] }[] = [];
    let swimlanes: INamedEntity[][] = [];
    let issuesToUseAsSwimlanes: IIssue[] = [];

    if (swimlaneType === SwimlaneTypeId.IssueType) {
        issuesToUseAsSwimlanes = props.project.issues.filter(issue => issue.type.id === swimlaneIssueType?.id);
        swimlanes = issuesToUseAsSwimlanes.map(swimlaneIssue => ([
            swimlaneIssue,
            ...project.issues.filter(issue => issue.parent?.id === swimlaneIssue.id)
        ]));

        swimlanesB = issuesToUseAsSwimlanes.map(swimlaneIssue => ({
            header: swimlaneIssue,
            issues: project.issues.filter(issue => issue.parent?.id === swimlaneIssue.id)
        }));

        console.log('swimlanes', swimlanes);
    } else if (swimlaneType === SwimlaneTypeId.Team) {
        swimlanes = project.teams.map(team => ([
            team,
            ...project.issues.filter(issue => issue.team?.id === team.id)
        ]));

        swimlanesB = props.project.teams.map(swimlaneTeam => ({
            header: swimlaneTeam,
            issues: project.issues.filter(issue => issue.parent?.id === swimlaneTeam.id)
        }));
    }

    // COLUMNS
    const [columnType, setColumnType] = useState<INamedEntity>(ColumnConstants.STATUS);
    const [columnStatus, setColumnStatus] = useState<IStatus[]>(project.statuses);
    const [columnSprint, setColumnSprint] = useState<ISprint[]>(project.sprints);

    let columnsB: { header: INamedEntity, issues: IIssue[] }[] = [];

    if (columnType.id === ColumnTypeId.Status) {
        columnsB = columnStatus.map(status => ({
            header: status,
            issues: project.issues.filter(issue => issue.status.id === status.id)
        }));
    } else if (columnType.id === ColumnTypeId.Sprint) {
        columnsB = columnSprint.map(sprint => ({
            header: sprint,
            issues: project.issues.filter(issue => issue.sprint?.id === sprint.id)
        }));
    }

    // GRID
    const boardIssues: IIssue[][][] = [];

    for (let i = 0; i < swimlanesB.length; i++) {
        boardIssues.push([]);
        for (let j = 0; j < columnsB.length; j++) {
            boardIssues[i].push([]);
            // if (i === 0 && j === 0) continue;

            boardIssues[i][j] = swimlanesB[i].issues.filter(issueInSwimlane => columnsB[j].issues.find(issueInColumn => issueInColumn.id === issueInSwimlane.id))
        }
    }

    const grid = [
        [
            <></>,
            ...columnsB.map(column => <div>{column.header.title}</div>)
        ],
        ...swimlanesB.map((swimlane, swimlaneIndex) => ([
            <div>{swimlane.header.title}</div>,
            ...boardIssues[swimlaneIndex].map((issues, columnIndex) => issues.map(issue => <BoardItem issue={issue} />))
        ]))
    ];

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
                        <Multiselect
                            options={ColumnConstants.ALL.map((column, i) => ({
                                id: column.id,
                                title: column.title,
                                value: column,
                                selected: column.id === columnType.id
                            }))}
                            onValueChanges={((options, selected, value) => {
                                setColumnType(value)
                            })}
                            isSingleSelect
                        />
                        {columnType.id === ColumnTypeId.Status &&
                            <Multiselect
                                options={props.project.statuses.map(status => ({
                                    id: status.id,
                                    title: status.title,
                                    value: status,
                                    selected: !!columnStatus.find(selectedStatus => selectedStatus.id === status.id)
                                }))}
                                onValueChanges={((options, selected, value) => {
                                    setColumnStatus(options.filter(option => option.selected).map(option => option.value));
                                })}
                            />
                        }
                        {columnType.id === ColumnTypeId.Sprint &&
                            <Multiselect
                                options={props.project.sprints.map(sprint => ({
                                    id: sprint.id,
                                    title: sprint.title,
                                    value: sprint,
                                    selected: !!columnSprint.find(selectedSprint => selectedSprint.id === sprint.id)
                                }))}
                                onValueChanges={((options, selected, value) => {
                                    setColumnSprint(options.filter(option => option.selected).map(option => option.value));
                                })}
                            />
                        }
                    </fieldset>
                </form>
            </header>
            <Grid
                id={'board-grid'}
                hideEmptyRows={false}
                grid={grid}
                // grid={swimlanes.map(swimlane => swimlane.map(swimlaneItem => <BoardItem issue={swimlaneItem as IIssue} />))}
            />
        </div>
    );
}
