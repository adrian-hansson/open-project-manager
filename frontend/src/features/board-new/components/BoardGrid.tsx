import { IIssue } from "core/types/IIssue";
import { INamedEntity } from "core/types/INamedEntity";
import { BoardItem } from "features/board-new/components/BoardItem";
import Grid from "shared/components/grid/Grid";

export interface IBoardGridProps {
    swimlanes: { header: INamedEntity, issues: IIssue[] }[];
    columns: { header: INamedEntity, issues: IIssue[] }[];
    // issues: IIssue[];
}

export function BoardGrid(props: IBoardGridProps) {
    const boardIssues: IIssue[][][] = [];

    for (let i = 0; i < props.swimlanes.length; i++) {
        boardIssues.push([]);
        for (let j = 0; j < props.columns.length; j++) {
            boardIssues[i].push([]);
            // if (i === 0 && j === 0) continue;

            boardIssues[i][j] = props.swimlanes[i].issues.filter(issueInSwimlane => props.columns[j].issues.find(issueInColumn => issueInColumn.id === issueInSwimlane.id))
        }
    }

    const grid = [
        [
            <></>,
            ...props.columns.map(column => <div>{column.header.title}</div>)
        ],
        ...props.swimlanes.map((swimlane, swimlaneIndex) => ([
            <div>{swimlane.header.title}</div>,
            ...boardIssues[swimlaneIndex].map((issues, columnIndex) => issues.map(issue => <BoardItem key={issue.id} issue={issue} />))
        ]))
    ];

    return (
        <Grid
            id={'board-grid'}
            hideEmptyRows={false}
            grid={grid}
        />
    );
}
