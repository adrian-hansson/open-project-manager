import { IIssue } from 'core/types/IIssue';
import { INamedEntity } from 'core/types/INamedEntity';
import { IProject } from 'core/types/IProject';
import Grid from 'shared/components/grid/Grid';
import { MultiselectOption } from 'shared/components/Multiselect';
import BoardFilter, { IBoardFilter } from './BoardFilter';
import BoardIssue from './BoardIssue';
import './GenericBoard.scss';
import { useBoardFilterState } from './services/boardFilterService';

export interface IHeader extends INamedEntity {
}

export interface ISwimlane extends INamedEntity {
    url?: string;
}

export interface IGenericBoardProps {
    title: string;
    project: IProject;
    onFilterChanges?: (filter: Partial<IBoardFilter>) => void;
}

export enum SwimlaneType {
    Team = 'Team',
    UserStory = 'UserStory',
    Epic = "Epic"
}

export enum ColumnType {
    Iteration = 'Iteration',
    Status = 'Status'
}

export interface IIssueTime {
    timeEstimate: number;
    timeSpent: number;
    timeRemaining: number;
}

const getIsIssueInColumn = (issue: IIssue, column: MultiselectOption, columnTypes: MultiselectOption[]): boolean => {
    let isIssueInColumn: boolean = false;
    const selectedColumnType: MultiselectOption | undefined = columnTypes.find(columnType => columnType.selected);
    if (selectedColumnType) {
        const isSelectColumnTypeIteration: boolean = selectedColumnType.id === ColumnType.Iteration;
        const isSelectedColumnTypeStatus: boolean = selectedColumnType.id === ColumnType.Status;
        if (isSelectColumnTypeIteration) {
            isIssueInColumn = issue.sprint?.id === column.id;
        } else if (isSelectedColumnTypeStatus) {
            isIssueInColumn = issue.status?.id === column.id;
        }
    }
    return isIssueInColumn;
};

const getIsIssueInSwimlane = (issue: IIssue, swimlane: MultiselectOption, swimlaneTypes: MultiselectOption[]): boolean => {
    const isIssueInSwimlane: boolean = !!(
        (swimlaneTypes.find(swimlaneType => swimlaneType.id === SwimlaneType.Team && swimlaneType.selected) && issue?.team?.id === swimlane.id) ||
        (swimlaneTypes.find(swimlaneType => swimlaneType.id === SwimlaneType.UserStory && swimlaneType.selected) && (issue?.parent?.id === swimlane.id || issue.id === swimlane.id)) ||
        (swimlaneTypes.find(swimlaneType => swimlaneType.id === SwimlaneType.Epic && swimlaneType.selected) && (issue?.parent?.id === swimlane.id || issue.id === swimlane.id))
    );

    return isIssueInSwimlane;
};

const isIssueInGridItem = (
    issue: IIssue,
    swimlane: MultiselectOption,
    column: MultiselectOption,
    swimlaneTypes: MultiselectOption[],
    columnTypes: MultiselectOption[],
    selectedCardTypes: MultiselectOption[],
    selectedTeams: MultiselectOption[],
    cardSearchQuery: string | null
): boolean => {
    const isIssueInSwimlane: boolean = getIsIssueInSwimlane(issue, swimlane, swimlaneTypes);
    const isIssueInColumn: boolean = getIsIssueInColumn(issue, column, columnTypes);
    const isIssueAmongSelectedTypes: boolean = issue.type.title === selectedCardTypes.filter((type: MultiselectOption) => type.selected)[0]?.id;
    const isIssueInOneOfSelectedTeams: boolean = !!selectedTeams.find(team => team.id === issue?.team?.id)?.selected;
    const isIssueMatchedByCardSearch: boolean = (cardSearchQuery ? issue.title.toLowerCase().includes(cardSearchQuery.toLowerCase()) : true);

    return isIssueInSwimlane
        && isIssueInColumn
        && isIssueAmongSelectedTypes
        && isIssueInOneOfSelectedTeams
        && isIssueMatchedByCardSearch;
};

function GenericBoard(props: IGenericBoardProps) {
    const [filter, setFilter] = useBoardFilterState(props.project);
    
    let gridRows: any[][] = [];

    const totalEstimateRows: IIssueTime[][] = [];

    filter.selectedSwimlanes
        .filter(swimlane => swimlane.selected)
        .forEach((swimlane, rowIndex) => {
            let swimlaneRow: any[] = [];
    
            const swimlaneColumns: any = [];
            const totalEstimatesForIssueRow: IIssueTime[] = [];
            filter.selectedColumns
                .filter(column => column.selected)
                .forEach((column, columnIndex) => {
                    const totalEstimatesForIssuesInGridItem: IIssueTime = {
                        timeSpent: 0,
                        timeEstimate: 0,
                        timeRemaining: 0
                    };
                    const issuesInGridItem: any[] = [];
                    props.project.issues
                        .filter(issue => isIssueInGridItem(issue, swimlane, column, filter.swimlaneTypes, filter.columnTypes, filter.selectedCardTypes, filter.selectedTeams, filter.cardSearchQuery))
                        .forEach((issue, issueIndex) => {
                            issuesInGridItem.push(<BoardIssue key={`board-card-${rowIndex}-${columnIndex}-${issueIndex}-${issue.id}`} issue={issue} />);
                            totalEstimatesForIssuesInGridItem.timeSpent += issue.timeSpent ? issue.timeSpent : 0;
                            totalEstimatesForIssuesInGridItem.timeEstimate += issue.timeEstimated ? issue.timeEstimated : 0;
                            totalEstimatesForIssuesInGridItem.timeRemaining += issue.timeRemaining ? issue.timeRemaining : 0;
                        });
                    totalEstimatesForIssueRow.push(totalEstimatesForIssuesInGridItem);
                    swimlaneColumns.push(issuesInGridItem);
                });

            swimlaneRow = [swimlane.title, ...swimlaneColumns];
            gridRows.push(swimlaneRow);
            totalEstimateRows.push(totalEstimatesForIssueRow);
        });
    
    const totalEstimatesPerColumn: IIssueTime[] = [];
    filter.selectedColumns
        .filter(column => column.selected)
        .forEach((column, columnIndex) => {
            const totalEstimatesForColumn: IIssueTime = {
                timeSpent: 0,
                timeEstimate: 0,
                timeRemaining: 0
            };
            totalEstimateRows.forEach((totalEstimatesRow, rowIndex) => {
                totalEstimatesForColumn.timeSpent += totalEstimatesRow[columnIndex].timeSpent;
                totalEstimatesForColumn.timeEstimate += totalEstimatesRow[columnIndex].timeEstimate;
                totalEstimatesForColumn.timeRemaining += totalEstimatesRow[columnIndex].timeRemaining;
            });
            totalEstimatesPerColumn.push(totalEstimatesForColumn);
        });

    const gridHeaders: any[] = [
        null,
        ...filter.selectedColumns
            .filter(column => column.selected)
            .map((column, colIndex) => (
                <>
                    <div>{column.title}</div>
                    {/* <div>
                        <span>{totalEstimatesPerColumn[colIndex].timeSpent}</span>
                        /<span>{totalEstimatesPerColumn[colIndex].timeEstimate}</span>
                         (<span>{totalEstimatesPerColumn[colIndex].timeRemaining}</span>)
                    </div> */}
                </>
            ))
    ];
    
    const grid: any[][] = [
        gridHeaders,
        ...gridRows
    ];

    return (
        <section className='generic-board'>
            <BoardFilter
                filters={filter}
                onValueChanges={event => setFilter(event.filters)}
            />

            <Grid
                id={'testGrid'}
                hideEmptyRows={filter.hideEmptySwimlanes}
                grid={grid}
            />
        </section>
    )
}

export default GenericBoard;
