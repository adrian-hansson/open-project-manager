export interface IFilterContainerProps {
    children?: any;
}

export function FilterContainer(props: IFilterContainerProps) {
    return <form className='filter'>
        {props.children}
    </form>;
}
