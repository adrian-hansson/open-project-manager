import api from "api/shared/api";
import { Endpoints } from "api/shared/endpoints";
import { IIssue } from "core/types/IIssue";
import { mockAllIssues } from "mock/issues/mockAllIssues";

export async function fetchAllIssues(): Promise<IIssue[]> {
    if (process.env.USE_MOCK) {
        return await Promise.resolve(mockAllIssues());
    }

    // return await Promise.resolve([]);
    return await api.get(Endpoints.Issues)
}
