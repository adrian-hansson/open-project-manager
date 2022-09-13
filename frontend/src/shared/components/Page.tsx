import { UseQueryResult } from "@tanstack/react-query";

export interface IPageProps {
    query: UseQueryResult<any, unknown> | { isLoading: boolean, isError: boolean } // TODO: remove alt
    children: any;
}

export function Page(props: IPageProps) {
    let content: any;

    if (props.query.isLoading) {
        content = <div>Loading...</div> 
    } else if (props.query.isError) {
        content = <div>Error</div>;
    } else {
        content = props.children;
    }

    return (
        <section className="page">
            {content}
        </section>
    );
}
