import { ColumnConstants } from "core/constants/BoardColumnConstants";
import { ColumnTypeId } from "core/enums/BoardColumnsTypes";
import { IColumn } from "core/types/IColumn";
import { INamedEntity } from "core/types/INamedEntity";
import { IProject } from "core/types/IProject";
import { ISprint } from "core/types/ISprint";
import { IStatus } from "core/types/IStatus";
import { useEffect, useState } from "react";
import Multiselect from "shared/components/Multiselect";

export interface IColumnsFilterProps {
    project: IProject;
    filteredProject: IProject;
    setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>;
}

export function ColumnsFilter(props: IColumnsFilterProps) {
    const project: IProject = props.project;
    const filteredProject: IProject = props.filteredProject;
    const setColumns = props.setColumns;

    const [columnType, setColumnType] = useState<INamedEntity>(ColumnConstants.STATUS);
    const [columnStatus, setColumnStatus] = useState<IStatus[]>(filteredProject.statuses);
    const [columnSprint, setColumnSprint] = useState<ISprint[]>(filteredProject.sprints);

    useEffect(
        () => {
            let columns: IColumn[] = [];

            if (columnType.id === ColumnTypeId.Status) {
                columns = columnStatus.map(status => ({
                    header: status,
                    issues: filteredProject.issues.filter(issue => issue.status.id === status.id)
                }));
            } else if (columnType.id === ColumnTypeId.Sprint) {
                columns = columnSprint.map(sprint => ({
                    header: sprint,
                    issues: filteredProject.issues.filter(issue => issue.sprint?.id === sprint.id)
                }));
            }

            setColumns(columns);
        },
        [project, filteredProject, setColumns, columnType, columnStatus, columnSprint]
    );

    return (
        <>
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
                        options={props.project.statuses.map(status => ({ // TODO: Should evaluate the use of filteredProject here
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
        </>
    );
}
