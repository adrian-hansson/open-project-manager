import { IIssue } from "core/types/IIssue";

export interface ITaskProps {
    boardTask: IIssue;
}

function Task(props: ITaskProps) {
  return (
    <div className='Task'>
        <header>
            <a href={props.boardTask.url || '#'}>{props.boardTask.title}</a>
        </header>
        <div className='content'>
            {props.boardTask.status?.id ? props.boardTask.status.title : 'Not started'}
        </div>
        <footer>
            <small>{props.boardTask.team?.title}</small>
        </footer>
    </div>
  )
}

export default Task;
