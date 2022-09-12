import { SwimlaneTypeId } from "core/enums/BoardSwimlaneTypes";
import { INamedEntity } from "core/types/INamedEntity";

export class SwimlaneConstants {
    public static NONE: INamedEntity = {
        id: SwimlaneTypeId.None,
        title: 'None'
    };

    public static ISSUE_TYPE: INamedEntity = {
        id: SwimlaneTypeId.IssueType,
        title: 'Issue Type'
    };

    public static ASSIGNEE: INamedEntity = {
        id: SwimlaneTypeId.Assignee,
        title: 'Assignee'
    };

    public static TEAM: INamedEntity = {
        id: SwimlaneTypeId.Team,
        title: 'Team'
    };

    public static get ALL(): INamedEntity[] {
        return [
            SwimlaneConstants.NONE,
            SwimlaneConstants.ISSUE_TYPE,
            SwimlaneConstants.ASSIGNEE,
            SwimlaneConstants.TEAM
        ];
    }
}
