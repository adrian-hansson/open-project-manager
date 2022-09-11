import { useQuery } from "@tanstack/react-query";
import { fetchAllIssues } from "api/issues/fetchAllIssues";
import { Board } from "features/board/components/Board";
import { mockAllIssueTypes, mockAllPeople, mockAllSprints, mockAllStatuses, mockAllTeams } from "mock/issues/mockAllIssues";
import { Page } from "shared/components/Page";

export function BoardPage() {
    const query = useQuery(['issues'], fetchAllIssues);

    return (
        <Page query={query}>
            <Board
                issues={query.data || []}
                issueTypes={mockAllIssueTypes()}
                statuses={mockAllStatuses()}
                sprints={mockAllSprints()}
                teams={mockAllTeams()}
                people={mockAllPeople()}
            />
        </Page>
    );
}
