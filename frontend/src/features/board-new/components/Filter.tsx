import { IIssueType } from "core/types/IIssueType";
import { IPerson } from "core/types/IPerson";
import { IProject } from "core/types/IProject";
import { ISprint } from "core/types/ISprint";
import { ITeam } from "core/types/ITeam";
import { useEffect, useState } from "react";
import Multiselect, { MultiselectOption } from "shared/components/Multiselect";

export interface IFilterProps {
    project: IProject;
    setProject: React.Dispatch<React.SetStateAction<IProject>>;
    useManualUpdate?: boolean;
}

export function Filter(props: IFilterProps) {
    const projectFromProps: IProject = props.project;
    const useManualUpdates: boolean | undefined = props.useManualUpdate;
    const setProjectFromProps: React.Dispatch<React.SetStateAction<IProject>> = props.setProject;

    const [search, setSearch] = useState<string>('');
    const [labels, setLabels] = useState<string | undefined>(undefined);
    const [issueTypes, setIssueTypes] = useState<IIssueType[]>([]);
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [sprints, setSprints] = useState<ISprint[]>([]);
    const [people, setPeople] = useState<IPerson[]>([]);

    const [project, setProject] = useState<IProject>(props.project);

    useEffect(
        () => {
            const filteredProject: IProject = {
                ...projectFromProps,
                issues: projectFromProps.issues.filter(issue => {
                    const isTitleInFilterSearch: boolean = search ? issue.title.toLowerCase().trim().includes(search.toLowerCase().trim()) : true;
                    const areLabelsInFilter: boolean = labels ? !labels.split(',').map(label => label.trim()).some(label => !issue.tags.includes(label)) : true;
                    const isIssueTypeInFilter: boolean = issueTypes.length > 0 ? issueTypes.some(issueType => issueType.id === issue.type.id) : true;
                    const isIssueTeamInFilter: boolean = teams.length > 0 ? teams.some(team => team.id === issue.team?.id) : true;
                    const isIssueSprintInFilter: boolean = sprints.length > 0 ? sprints.some(sprint => sprint.id === issue.sprint?.id) : true;
                    const isIssueAssignedToPeople: boolean = people.length > 0 ? people.some(person => person.id === issue.assignee?.id) : true;

                    return isTitleInFilterSearch &&
                           areLabelsInFilter &&
                           isIssueTypeInFilter &&
                           isIssueTeamInFilter &&
                           isIssueSprintInFilter &&
                           isIssueAssignedToPeople;
                })
            };
            setProject(filteredProject);

            console.log('filteredProject', filteredProject);

            if (!useManualUpdates) {
                setProjectFromProps(filteredProject);
            }
        },
        [projectFromProps, setProjectFromProps, useManualUpdates, search, labels, issueTypes, teams, sprints, people]
    );

    return (
        <>
            <fieldset>
                <legend>Title Search</legend>
                <input type='text' placeholder='Search' onChange={(event) => setSearch(event.target.value || '')} />
            </fieldset>

            <fieldset>
                <legend>Tags</legend>
                <input type='text' placeholder='Tags...' onChange={(event) => setLabels(event.target.value || '')} />
            </fieldset>

            <fieldset>
                <legend>Issue Types</legend>
                <Multiselect
                    options={props.project.issueTypes.map(issueType => ({
                        id: issueType.id,
                        title: issueType.title,
                        selected: true,
                        value: issueType
                    }))}
                    onValueChanges={(selections: MultiselectOption[]) => {
                        const selectedIssueTypes: IIssueType[] = [];
                        selections.forEach(selection => {
                            if (selection.selected) {
                                const selectedIssueType: IIssueType | undefined = props.project.issueTypes
                                    .find(issueType => issueType.id === selection.id);

                                if (selectedIssueType) {
                                    selectedIssueTypes.push(selectedIssueType);
                                }
                            }
                        });
                        setIssueTypes(selectedIssueTypes);
                    }}
                />
            </fieldset>

            <fieldset>
                <legend>Team</legend>
                <Multiselect
                    options={props.project.teams.map(team => ({ id: team.id, title: team.title, value: team, selected: true }))}
                    onValueChanges={(selections: MultiselectOption[]) => {
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
                        setTeams(selectedTeams);
                    }}
                />
            </fieldset>

            <fieldset>
                <legend>Sprints</legend>
                <Multiselect
                    options={props.project.sprints.map(sprint => ({ id: sprint.id, title: sprint.title, value: sprint, selected: true }))}
                    onValueChanges={(selections: MultiselectOption[]) => {
                        const selectedSprints: ISprint[] = [];
                        selections.forEach(selection => {
                            if (selection.selected) {
                                const selectedSprint: ISprint | undefined = props.project.sprints
                                    .find(sprint => sprint.id === selection.id);

                                if (selectedSprint) {
                                    selectedSprints.push(selectedSprint);
                                }
                            }
                        });
                        setSprints(selectedSprints);
                    }}
                />
            </fieldset>

            <fieldset>
                <legend>Assignees</legend>
                <Multiselect
                    options={props.project.people.map(person => ({ id: person.id, title: person.title, value: person, selected: true }))}
                    onValueChanges={(selections: MultiselectOption[]) => {
                        const selectedPeople: IPerson[] = [];
                        selections.forEach(selection => {
                            if (selection.selected) {
                                const selectedPerson: IPerson | undefined = props.project.people
                                    .find(sprint => sprint.id === selection.id);

                                if (selectedPerson) {
                                    selectedPeople.push(selectedPerson);
                                }
                            }
                        });
                        setPeople(selectedPeople);
                    }}
                />
            </fieldset>

            {props.useManualUpdate && <button onClick={() => props.setProject(project)}>Filter</button>}
        </>
    );
}
