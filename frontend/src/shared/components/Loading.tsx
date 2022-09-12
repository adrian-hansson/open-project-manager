export interface ILoadingProps {
    isLoading: boolean;
    element: any;
    fallback: any;
}

function Loading(props: ILoadingProps) {
    if (props.isLoading) {
        return (<div className="loading">Loading...</div>);
    }

    return props.element || props.fallback;
}

export default Loading;
