import { IUUIDAdapter } from "src/domain/adapters/IUUIDAdapter";
import { CreateIssueDto } from "src/domain/dto/CreateIssueDto";
import { IssueDto } from "src/domain/dto/IssueDto";
import { AggregateRoot } from "src/domain/shared/AggregateRoot";
import { Description } from "src/domain/valueObjects/Description";
import { Id } from "src/domain/valueObjects/Id";
import { IssueName } from "src/domain/valueObjects/IssueName";

export class Issue extends AggregateRoot {
    private constructor(
        protected id: Id,
        private title: IssueName,
        private description: Description,
        private uuid: IUUIDAdapter
    ) {
        super(id);
    }

    private static create(issue: IssueDto, uuid: IUUIDAdapter): Issue {
        return new Issue(
            Id.createExisting(issue.id),
            IssueName.create(issue.title),
            Description.create(issue.description),
            uuid
        );
    }

    public static createNew(newIssue: CreateIssueDto, uuid: IUUIDAdapter): Issue {
        return Issue.create(
            {
                ...newIssue,
                id: Id.createNew(uuid).value
            },
            uuid
        );

    }

    public static createExisting(issue: IssueDto, uuid: IUUIDAdapter): Issue {
        return Issue.create(issue, uuid);
    }
}
