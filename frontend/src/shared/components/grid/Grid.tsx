import { useState } from 'react';
import './Grid.scss';
import GridRowToggle from './GridRowToggle';

export interface IGridProps {
    id: string;
    grid: any[][];
    areHeadersBolded?: boolean;
    isFirstColumnBolded?: boolean;
    hideEmptyRows?: boolean;
}

function Grid(props: IGridProps) {
    const [columnsMinimized, setColumnsMinimized] = useState<number[]>([]);

    const toggleIsRowCollapsed = (rowIndex: number) => {
        const isRowCollapsed: boolean = columnsMinimized.includes(rowIndex);
        if (isRowCollapsed) {
            setColumnsMinimized(columnsMinimized.filter(columnIndex => columnIndex !== rowIndex));
        } else {
            setColumnsMinimized([...columnsMinimized, rowIndex]);
        }
    };

    return (
        <section className='grid-container'>
            {(props.grid)
                // .filter((row: any[]) => row.every((column: any, index: number) => (!column && index !== 0) || index === 0))
                .filter(row => props.hideEmptyRows ? props.hideEmptyRows && !row.slice(1).every(col => !col || (Array.isArray(col) && col.length === 0)) : true)
                .map((row: any[], rowIndex: number) => {
                    return row.map((cell: any, columnIndex: number) => {
                        const isRowHeader = columnIndex === 0;
                        const isColumnHeader = rowIndex === 0;
                        const isHeader: boolean = isRowHeader || isColumnHeader;
                        const isNoGridItem: boolean = rowIndex === 0 && columnIndex === 0;

                        return (
                            <div
                                key={`grid-item-${props.id}-${rowIndex}-${columnIndex}`}
                                className={
                                    `grid-item` +
                                    (isHeader ? ' grid-header' : '') +
                                    (isRowHeader ? ' grid-row-header' : '') +
                                    (isNoGridItem ? ' grid-no-item' : '')
                                }
                                style={{
                                    gridColumnStart: columnIndex + 1,
                                    gridColumnEnd: columnIndex + 1,
                                    gridRowStart: rowIndex + 1,
                                    gridRowEnd: rowIndex + 1
                                }}
                            >
                                {isHeader &&
                                    <header>
                                        {isRowHeader && !isColumnHeader
                                            ? <>
                                                    <GridRowToggle
                                                        onClick={() => toggleIsRowCollapsed(rowIndex)}
                                                        isCollapsed={columnsMinimized.includes(rowIndex)}
                                                    />
                                                    {cell}
                                            </>
                                            : cell}
                                    </header>}
                                
                                {!isHeader &&
                                    <>
                                        <div className='content'>
                                            {(isRowHeader || !columnsMinimized.includes(rowIndex)) ? cell : "-"}
                                        </div>
                                        <footer></footer>
                                    </>}
                            </div>
                        );
                    });
                })
            }
        </section>
    )
}

export default Grid;
