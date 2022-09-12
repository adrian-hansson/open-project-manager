import { IProject } from "core/types/IProject";
import { mockProject } from "mock/issues/mockAllIssues";

export async function fetchProject(id: string): Promise<IProject> {
    if (process.env.USE_MOCK) {
        return await Promise.resolve(mockProject(id));
    }

    // return await Promise.resolve([]);
    // return await api.get(Endpoints.Issues)
    return await Promise.resolve(mockProject(id));
}
