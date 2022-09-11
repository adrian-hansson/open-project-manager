export class IssueDto {
    constructor(
        public readonly id: number | string,
        public readonly title: string,
        public readonly description: string
    ) {}
}
