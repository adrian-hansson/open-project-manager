import './Tags.scss';

export interface ITagsProps {
    tags: string[];
}

export function Tags(props: ITagsProps) {
    return (
        <ul className="tags">
            {props.tags.map(tag => <li key={tag} className="tag">{tag}</li>)}
        </ul>
    );
}
