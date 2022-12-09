// import { useQuery } from "@tanstack/react-query";
// import { fetchProject } from "api/projects/fetchProject";
import { mockProject } from "mock/issues/mockAllIssues";
import { Page } from "shared/components/Page";
import { StoryMap } from "../components/StoryMap";

export function StoryMapPage() {
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
                <StoryMap
                    project={query.data}
                    // issues={query.data || []}
                    // issueTypes={mockAllIssueTypes()}
                    // statuses={mockAllStatuses()}
                    // sprints={mockAllSprints()}
                    // teams={mockAllTeams()}
                    // people={mockAllPeople()}
                /> :
                <>No data.</>
            }
        </Page>
    );
}
