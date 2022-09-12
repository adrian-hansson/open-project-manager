import { useQuery } from "@tanstack/react-query";
import { fetchProject } from "api/projects/fetchProject";
import { Board } from "features/board-new/components/Board";
import { Page } from "shared/components/Page";

export function BoardPage() {
    const query = useQuery(['project', 'p001'], ( { queryKey }) => fetchProject(queryKey[1]));

    return (
        <Page query={query}>
            {query.data ?
                <Board
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
