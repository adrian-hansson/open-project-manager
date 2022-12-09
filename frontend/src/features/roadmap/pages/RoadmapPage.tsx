// import { useQuery } from "@tanstack/react-query";
// import { fetchProject } from "api/projects/fetchProject";
import { Roadmap } from "features/roadmap/components/Roadmap";
import { mockProject } from "mock/issues/mockAllIssues";
import { Page } from "shared/components/Page";

export function RoadmapPage() {
    console.log('init', 'StoryMapPage');

    // const query = useQuery(['project', 'p001'], ( { queryKey }) => fetchProject(queryKey[1]));
    const query = {
        isLoading: false,
        isError: false,
        data: mockProject('p001')
    };

    return (
        <Page query={query}>
            {query.data ?
                <Roadmap
                    project={query.data}
                /> :
                <>No data.</>
            }
        </Page>
    );
}
