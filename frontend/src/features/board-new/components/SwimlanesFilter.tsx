import { SwimlaneConstants } from "core/constants/BoardSwimlaneConstants";
import { SwimlaneTypeId } from "core/enums/BoardSwimlaneTypes";
import { IIssue } from "core/types/IIssue";
import { IIssueType } from "core/types/IIssueType";
import { INamedEntity } from "core/types/INamedEntity";
import { IPerson } from "core/types/IPerson";
import { IProject } from "core/types/IProject";
import { ISwimlane } from "core/types/ISwimlane";
import { ITeam } from "core/types/ITeam";
import { useEffect, useState } from "react";
import Checkbox from "shared/components/Checkbox";
import Multiselect from "shared/components/Multiselect";

export interface ISwimlanesFilterProps {
    project: IProject;
    filteredProject: IProject;
    setSwimlanes: React.Dispatch<React.SetStateAction<ISwimlane[]>>;
}

export function SwimlanesFilter(props: ISwimlanesFilterProps) {
    const project: IProject = props.project;
    const filteredProject: IProject = props.filteredProject;
    const setSwimlanes = props.setSwimlanes;

    // SWIMLANES
    const [swimlaneType, setSwimlaneType] = useState<INamedEntity>(SwimlaneConstants.ISSUE_TYPE);
    const [swimlaneIssueType, setSwimlaneIssueType] = useState<IIssueType | undefined>(
        props.filteredProject.issueTypes.length > 1 ? props.filteredProject.issueTypes[1] : (props.filteredProject.issueTypes.length > 0 ? props.filteredProject.issueTypes[0] : undefined)
    );
    const [swimlaneAssignees, setSwimlaneAssignees] = useState<IPerson[]>(props.filteredProject.people);
    const [swimlaneTeams, setSwimlaneTeams] = useState<ITeam[]>(props.filteredProject.teams);
    const [hideEmptySwimlanes, setHideEmptySwimlanes] = useState<boolean>(false);

    useEffect(
        () => {
            let swimlanes: ISwimlane[] = [];
            let issuesToUseAsSwimlanes: IIssue[] = [];

            if (swimlaneType.id === SwimlaneTypeId.IssueType) {
                issuesToUseAsSwimlanes = project.issues.filter(issue => issue.type.id === swimlaneIssueType?.id);

                swimlanes = issuesToUseAsSwimlanes.map(swimlaneIssue => ({
                    header: swimlaneIssue,
                    issues: filteredProject.issues.filter(issue => issue.parent?.id === swimlaneIssue.id)
                }));

            } else if (swimlaneType.id === SwimlaneTypeId.Team) {
                swimlanes = swimlaneTeams.map(swimlaneTeam => ({
                    header: swimlaneTeam,
                    issues: filteredProject.issues.filter(issue => issue.team?.id === swimlaneTeam.id)
                }));
            } else if (swimlaneType.id === SwimlaneTypeId.Assignee) {
                swimlanes = swimlaneAssignees.map(swimlaneAssignee => ({
                    header: swimlaneAssignee,
                    issues: filteredProject.issues.filter(issue => issue.assignee?.id === swimlaneAssignee.id)
                }));
            }

            if (hideEmptySwimlanes) {
                swimlanes = swimlanes.filter(swimlane => swimlane.issues.length > 0);
            }

            setSwimlanes(swimlanes);
        },
        [project, filteredProject, setSwimlanes, swimlaneType, swimlaneIssueType, swimlaneAssignees, swimlaneTeams, hideEmptySwimlanes]
    );

    return (
        <>
            <fieldset>
                <legend>Swimlanes</legend>
                <Multiselect
                    options={SwimlaneConstants.ALL.map(s => ({
                        id: s.id,
                        title: s.title,
                        value: s,
                        selected: swimlaneType.id === s.id
                    }))}
                    onValueChanges={((_, selected) => setSwimlaneType(selected?.value))}
                    isSingleSelect
                />
                {swimlaneType.id === SwimlaneTypeId.IssueType &&
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
                {swimlaneType.id === SwimlaneTypeId.Team &&
                    <Multiselect
                        options={props.project.teams.map(team => ({
                            id: team.id,
                            title: team.title,
                            value: team,
                            selected: true
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
                {swimlaneType.id === SwimlaneTypeId.Assignee &&
                    <Multiselect
                        options={props.project.people.map(person => ({
                            id: person.id,
                            title: person.title,
                            value: person,
                            selected: !!swimlaneAssignees.find(assignee => assignee.id === person.id)
                        }))}
                        onValueChanges={((selections) => {
                            const selectedTeams: IPerson[] = [];
                            selections.forEach(selection => {
                                if (selection.selected) {
                                    const selectedPerson: IPerson | undefined = props.project.people
                                        .find(person => person.id === selection.id);

                                    if (selectedPerson) {
                                        selectedTeams.push(selectedPerson);
                                    }
                                }
                            });
                            setSwimlaneAssignees(selectedTeams);
                        })}
                    />
                }
                <Checkbox
                    label="Hide empty"
                    defaultValue={hideEmptySwimlanes}
                    onValueChanges={setHideEmptySwimlanes}
                />
            </fieldset>
        </>
    );
}