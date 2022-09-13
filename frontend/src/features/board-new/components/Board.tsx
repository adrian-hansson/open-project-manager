import { IColumn } from "core/types/IColumn";
import { IProject } from "core/types/IProject";
import { ISwimlane } from "core/types/ISwimlane";
import { useState } from "react";
import './Board.scss';
import { BoardGrid } from "./BoardGrid";
import { ColumnsFilter } from "./ColumnsFilter";
import { Filter } from "./Filter";
import { SwimlanesFilter } from "./SwimlanesFilter";

export interface IBoardProps {
    project: IProject;
}

export function Board(props: IBoardProps) {
    const [filteredProject, setFilteredProject] = useState<IProject>(props.project);
    const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);
    const [swimlanes, setSwimlanes] = useState<ISwimlane[]>([]);
    const [columns, setColumns] = useState<IColumn[]>([]);

    return (
        <div className="board">
            <header>
                <form className='filter'>
                    <Filter
                        project={props.project}
                        setFilteredProject={setFilteredProject}
                        setIsFilterLoading={setIsFilterLoading}
                    />

                    <SwimlanesFilter
                        project={props.project}
                        filteredProject={filteredProject}
                        setSwimlanes={setSwimlanes}
                    />

                    <ColumnsFilter
                        project={props.project}
                        filteredProject={filteredProject}
                        setColumns={setColumns}
                    />

                    {isFilterLoading && <div>Loading...</div>}
                </form>
            </header>

            <BoardGrid
                swimlanes={swimlanes}
                columns={columns}
            />
        </div>
    );
}
