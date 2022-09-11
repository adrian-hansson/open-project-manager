import { IQuery } from "application/queries/shared/IQuery";
import { IQueryResponse } from "application/queries/shared/IQueryResponse";

export interface IQueryHandler<T extends IQuery, R extends IQueryResponse> {
    handle(query: T): R;
}
