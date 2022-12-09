import { IIssue } from "core/types/IIssue";
import './Board.scss';
import { Tags } from "./Tags";

export interface IBoardItemProps {
    issue: IIssue;
}

export function BoardItem(props: IBoardItemProps) {
    const cardClassNames: string[] = [
        'board-item'
    ];
    if (props.issue.status.isCompleted) cardClassNames.push('completed');
    if (props.issue.status.isBlocked) cardClassNames.push('blocked');

    const sideClassNames: string[] = [
        'side'
    ];
    // if (props.issue.status.isCompleted) sideClassNames.push('completed');
    // if (props.issue.status.isBlocked) sideClassNames.push('blocked');
    // if (props.issue.status.isStarted) sideClassNames.push('started');

    return (
        <div className={cardClassNames.join(' ')}>
            <div
                className={sideClassNames.join(' ')}
                style={{
                    backgroundColor: props.issue.type.color
                }}
            ></div>
            <div className="body">
                <header>
                    <a
                        href={props.issue.url || '#'}
                    >
                        {props.issue.title}
                    </a>
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

                    
                    <Tags tags={props.issue.tags} />

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
        </div>
    );
}
