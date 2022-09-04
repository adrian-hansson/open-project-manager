import { IQuery } from "application/queries/ICommand";
import { IQueryResponse } from "application/queries/IQueryResponse";

export interface IQueryHandler<T extends IQuery, R extends IQueryResponse> {
    handle(query: T): R;
}
