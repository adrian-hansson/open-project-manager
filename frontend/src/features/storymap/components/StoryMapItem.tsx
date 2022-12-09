import { IIssue } from "core/types/IIssue";

export interface IStoryMapItemProps {
    issue: IIssue;
    gridColumnStart: number;
    gridColumnEnd: number;
    gridRowStart: number;
    gridRowEnd: number;
}

export function StoryMapItem(props: IStoryMapItemProps) {
    return (
        <div
            className={`grid-item`}
            style={{
                gridColumnStart: props.gridColumnStart,
                gridColumnEnd: props.gridColumnEnd,
                gridRowStart: props.gridRowStart,
                gridRowEnd: props.gridRowEnd,
                backgroundColor: props.issue.type.color
            }}
        >
            {props.issue.title}
        </div>
    );
}