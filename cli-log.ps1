# Setup project
New-Item open-project-manager -ItemType Directory
Set-Location .\open-project-manager
New-Item docs -ItemType Directory
New-Item docs/decisions -ItemType Directory
New-Item docs/images -ItemType Directory
New-Item LICENSE.txt
New-Item README.md
New-Item .gitignore

# Setup frontend
npx create-react-app frontend --template typescript
Set-Location .\frontend\

## Install frontend dependencies
npm install react-router-dom
npm install sass
npm i @tanstack/react-query
Set-Location ..

# Setup backend
npm i -g @nestjs/cli
nest new backend
Set-Location backend

# Setup env
New-Item env -ItemType Directory

## Setup common functionality
New-Item src/common -ItemType Directory

## Setup Clean Architecture

### Layer 1: Entities / Enterprise Business Rules
New-Item src/domain -ItemType Directory
New-Item src/domain/adapters -ItemType Directory
New-item src/domain/adapters/README.md -Value @"
# Domain/Adapters

Include interfaces here that must be used to adapt external libraries. The dependencies must be injected as to avoid dependencies from the domain to the outside.

"@
New-Item src/domain/aggregates -ItemType Directory
New-Item src/domain/dto -ItemType Directory
New-Item src/domain/dto/README.md -Value @"
# Domain/DTO

Objects used to transfer data into and out of a domain. Must be read-only.

"@
New-Item src/domain/entities -ItemType Directory
New-Item src/domain/exceptions -ItemType Directory
New-Item src/domain/exceptions/DomainException.ts -Value @"
export class DomainException extends Error {
    constructor(message: string) {
        super(message)
    }
}

"@
New-Item src/domain/events -ItemType Directory
New-Item src/domain/valueObjects -ItemType Directory
New-Item src/domain/shared -ItemType Directory

### Layer 2: Use Cases / Application Business Rules
New-Item src/application -ItemType Directory
New-Item src/application/repositories -ItemType Directory
New-Item src/application/repositories/IRepository.ts
New-Item src/application/commands -ItemType Directory
New-Item src/application/commands/ICommand.ts -Value @"
export interface ICommand {}

"@
New-Item src/application/commands/ICommandHandler.ts -Value @"
import { ICommand } from "application/commands/ICommand";

export interface ICommandHandler<T extends ICommand, R = void> {
    handle(command: T): R;
}

"@
New-Item src/application/queries -ItemType Directory
New-Item src/application/commands/IQuery.ts -Value @"
export interface IQuery {}

"@
New-Item src/application/commands/IQueryResponse.ts -Value @"
export interface IQueryResponse {}

"@
New-Item src/application/commands/IQueryHandler.ts -Value @"
import { IQuery } from "application/queries/ICommand";
import { IQueryResponse } from "application/queries/IQueryResponse";

export interface IQueryHandler<T extends IQuery, R extends IQueryResponse> {
    handle(query: T): R;
}

"@

### Layer 3: Controllers / Interface Adapters
New-Item src/interface -ItemType Directory
New-Item src/interface/controllers -ItemType Directory
New-Item src/interface/adapters -ItemType Directory
New-Item src/interface/adapters/README.md -Value @"
# Interface/Adapters

External adapters for libraries and frameworks. Should implement interfaces from core libraries.

"@
New-Item src/interface/errors -ItemType Directory
New-Item src/interface/view-models -ItemType Directory

### Layer 4: DB / External Interfaces / Frameworks and Drivers
New-Item src/infrastructure -ItemType Directory
New-Item src/infrastructure/adapters -ItemType Directory
New-Item src/infrastructure/adapters/README.md -Value @"
# Infrastructure/Adapters

External adapters for libraries and frameworks. Should implement interfaces from core libraries.

"@
New-Item src/infrastructure/database -ItemType Directory
New-Item src/infrastructure/database/migrations -ItemType Directory
New-Item src/infrastructure/database/repositories -ItemType Directory
New-Item src/infrastructure/database/ioc -ItemType Directory # create modules here that inject classes to implement the interfaces in Layer 3 (use cases)
New-Item src/infrastructure/logger -ItemType Directory

## Test
New-Item test/e2e -ItemType Directory
New-Item test/unit -ItemType Directory
New-Item test/unit/domain -ItemType Directory
New-Item test/unit/application -ItemType Directory
New-Item test/unit/presentation -ItemType Directory

Set-Location ..
