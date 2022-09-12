import { ColumnTypeId } from "core/enums/BoardColumnsTypes";
import { INamedEntity } from "core/types/INamedEntity";

export class ColumnConstants {
    public static STATUS: INamedEntity = {
        id: ColumnTypeId.Status,
        title: 'Status'
    };

    public static SPRINT: INamedEntity = {
        id: ColumnTypeId.Sprint,
        title: 'Sprint'
    };

    public static get ALL(): INamedEntity[] {
        return [
            ColumnConstants.STATUS,
            ColumnConstants.SPRINT
        ];
    }
}
