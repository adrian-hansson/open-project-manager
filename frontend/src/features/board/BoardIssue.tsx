import { IIssue } from "core/types/IIssue";

export interface IBoardIssueProps {
    issue: IIssue;
}

function BoardIssue(props: IBoardIssueProps) {
    let  cardTypeClass: string = ''

    // if (props.issue.type && props.issue.workType === 'Design') {
    //     cardTypeClass = ' design'
    // } else if (props.issue.type && props.issue.workType === 'Build') {
    //     cardTypeClass = ' build'
    // } else if (props.issue.type && props.issue.workType === 'Test') {
    //     cardTypeClass = ' test'
    // }

    return (
        <>
            {/* <Card>
                <Card.Body>
                    <Card.Title><a href={props.card.url || '#'}>{props.card.title}</a></Card.Title>
                </Card.Body>
                <ListGroup horizontal>
                    {props.card.type &&
                        <ListGroupItem className={'type' + cardTypeClass}>{props.card.type}</ListGroupItem>}
                    
                    {(props.card.timeEstimated && props.card.timeRemaining && props.card.timeSpent) &&
                        <ListGroupItem>
                            <progress value={props.card.timeSpent} max={props.card.timeEstimated}>
                                {props.card.timeSpent} / {props.card.timeEstimated}
                            </progress>
                        </ListGroupItem>}
                    
                    {(props.card.endDate) &&
                        <ListGroupItem>
                            <span className='due'>
                                <time className={props.card.endDate < new Date() ? 'danger' : ''}>{props.card.endDate.toLocaleDateString()}</time>
                            </span>
                        </ListGroupItem>}
                    
                    <ListGroupItem>
                        <ProgressBar>
                            <ProgressBar striped now={40} key={1}>Time of Estimate Used</ProgressBar>
                            <ProgressBar striped variant="light" now={0} key={2}>Remaining</ProgressBar>
                            <ProgressBar striped variant="danger" now={60} key={3}>Over Estimate</ProgressBar>
                        </ProgressBar>
                    </ListGroupItem>
                </ListGroup>
            </Card> */}

            <div className='card'>
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
        </>
    )
}

export default BoardIssue;
