import { IIssue } from "core/types/IIssue";

export interface IBoardItemProps {
    issue: IIssue;
}

export function BoardItem(props: IBoardItemProps) {
    return (
        <div className='board-item'>
            <header>
                <a href={props.issue.url || '#'}>{props.issue.title}</a>
            </header>
            <div className='content'>
            </div>
            <footer>
                {/* TYPE */}
                {/* {props.issue.type &&
                    <small className={'type' + cardTypeClass}>{props.issue.workType}</small>} */}

                {/* TIME */}
                {/* {(props.issue.timeEstimate && props.issue.timeRemaining && props.issue.timeSpent) &&
                    <progress value={props.issue.timeSpent} max={props.issue.timeEstimate}>
                        {props.issue.timeSpent} / {props.issue.timeEstimate}
                    </progress>} */}
                {(props.issue.timeEstimated && props.issue.timeRemaining && props.issue.timeSpent) &&
                    <span>{props.issue.timeSpent}/{props.issue.timeEstimated} ({props.issue.timeRemaining})</span>}
                
                {/* DATES */}
                {(props.issue.dateDue) &&
                    <span className='due'>
                        {/* <time>{props.card.startDate.toLocaleDateString()}</time> */}
                        {/* <span>Due: </span> */}
                        <time className={props.issue.dateDue && props.issue.dateDue < new Date() ? 'danger' : ''}>{props.issue.dateDue.toLocaleDateString()}</time>
                    </span>}
            </footer>
        </div>
    );
}
