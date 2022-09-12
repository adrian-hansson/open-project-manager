// import { IIssueType } from "core/types/IIssueType";
// import { IProject } from "core/types/IProject";
// import { useState } from "react";
// import { MultiselectOption } from "shared/components/Multiselect";
// import { IBoardFilter } from "../BoardFilter";
// import { ColumnType, SwimlaneType } from "../GenericBoard";

import { IProject } from "core/types/IProject";
import { IBoardFilter } from "../BoardFilter";

// export const useBoardFilterState = (initialProject: IProject): [IBoardFilter, (partialFilter: Partial<IBoardFilter>) => void] => {
//     const updateFilter = (project: IProject, currentFilter: IBoardFilter, updatedFilterValues: Partial<IBoardFilter>): IBoardFilter => {
//         let newFilter: IBoardFilter = currentFilter;
    
//         newFilter = updateFilterWithDirectChanges(newFilter, updatedFilterValues);
//         newFilter = updateFilterWithIndirectChanges(project, newFilter, currentFilter, updatedFilterValues);
    
//         return newFilter;
//     }
    
//     const updateFilterWithDirectChanges = (currentFilter: IBoardFilter, updatedFilterValues: Partial<IBoardFilter>): IBoardFilter => (
//         {
//             ...currentFilter,
//             ...updatedFilterValues,
//             cardSearchQuery: updateCardSearchQuery(currentFilter, updatedFilterValues)
//         }
//     );
    
//     const updateCardSearchQuery = (currentFilter: IBoardFilter, updatedFilterValues: Partial<IBoardFilter>): string | null => {
//         if (updatedFilterValues.cardSearchQuery !== undefined && updatedFilterValues.cardSearchQuery !== null) {
//             return updatedFilterValues.cardSearchQuery;
//         }
//         return currentFilter.cardSearchQuery;
//     }
    
//     const updateFilterWithIndirectChanges = (project: IProject, newFilter: IBoardFilter, currentFilter: IBoardFilter, updatedFilterValues: Partial<IBoardFilter>): IBoardFilter => {  
//         if (updatedFilterValues.swimlaneTypes) {
//             newFilter = {
//                 ...newFilter,
//                 selectedSwimlanes: initSwimlanes(project, newFilter, currentFilter, updatedFilterValues)
//             }
//         }
    
//         if (updatedFilterValues.columnTypes) {
//             newFilter = {
//                 ...newFilter,
//                 selectedColumns: initColumns(project, newFilter, currentFilter, updatedFilterValues)
//             }
//         }
    
//         return newFilter;
//     }

//     const isSwimlaneTypeSelected = (currentFilter: IBoardFilter, updatedFilterValues: Partial<IBoardFilter>, swimlaneType: SwimlaneType): boolean => {
//         return !!(updatedFilterValues.swimlaneTypes || currentFilter.swimlaneTypes)
//             .find(swimlaneTypeSelectOption => swimlaneTypeSelectOption?.id === swimlaneType && swimlaneTypeSelectOption?.selected);
//     }

//     const mapIssuesToSwimlanes = (project: IProject, selectedSwimlaneType: MultiselectOption): MultiselectOption[] => {
//         let issueType: IIssueType | undefined;

//         switch (selectedSwimlaneType.id) {
//             case SwimlaneType.UserStory:
//                 issueType = IssueType.UserStory
//                 break;
//             case SwimlaneType.Epic:
//                 issueType = IssueType.Epic
//                 break;
//         }

//         return issueType
//             ? project.issues
//                 .filter(issue => issue.type.title === issueType)
//                 .map((userStory) => {
//                     return { id: userStory.id, selected: true, title: userStory.title };
//                 })
//             : [];
//     };
    
//     const initSwimlanes = (project: IProject, newFilter: IBoardFilter, currentFilter: IBoardFilter, updatedFilterValues: Partial<IBoardFilter>): MultiselectOption[] => {
//         const selectedSwimlaneType: MultiselectOption | undefined = (updatedFilterValues.swimlaneTypes || currentFilter.swimlaneTypes)
//             .find(swimlaneTypeSelectOption => swimlaneTypeSelectOption?.selected);
        
//         if (selectedSwimlaneType) {
//             const isSelectedSwimlaneTypeTeam: boolean = isSwimlaneTypeSelected(currentFilter, updatedFilterValues, SwimlaneType.Team);
//             const isSelectedSwimlaneTypeIssue: boolean = isSwimlaneTypeSelected(currentFilter, updatedFilterValues, SwimlaneType.UserStory) ||
//                                                          isSwimlaneTypeSelected(currentFilter, updatedFilterValues, SwimlaneType.Epic);
        
//             if (isSelectedSwimlaneTypeTeam) {
//                 return project.teams.map((team) => {
//                     return { id: team.id, selected: true, title: team.title };
//                 });
//             }
//             else if (isSelectedSwimlaneTypeIssue) {
//                 return mapIssuesToSwimlanes(project, selectedSwimlaneType)
//             }
//         }
    
//         return [];
//     };
    
//     const initColumns = (project: IProject, newFilter: IBoardFilter, currentFilter: IBoardFilter, updatedFilterValues: Partial<IBoardFilter>): MultiselectOption[] => {
//         if ((updatedFilterValues.columnTypes || currentFilter.columnTypes).find(columnType => columnType?.id === ColumnType.Iteration && columnType?.selected)) {
//             return project.sprints.map(sprint => {
//                 return { id: sprint.id, selected: true, title: sprint.title, value: sprint };
//             });
//         } else if ((updatedFilterValues.columnTypes || currentFilter.columnTypes).find(columnType => columnType?.id === ColumnType.Status && columnType?.selected)) {
//             return project.statuses.map((status) => {
//                 return { id: status.id, selected: true, title: status.title, value: status };
//             });
//         }
    
//         return [];
//     };

//     const initFilter = (project: IProject): IBoardFilter => {
//         const filter: IBoardFilter = {
//             cardSearchQuery: null,
//             selectedCardTypes: Object.keys(IssueType).map((key, i) => {
//                 let title: string;
//                 switch (key) {
//                     case IssueType.UserStory:
//                         title = 'User Story';
//                         break;
//                     default:
//                         title = key;
//                         break;
//                 }
//                 return { id: key, selected: i === 0, title: title };
//             }),
//             columnTypes: Object.keys(ColumnType).map((key, i) => {
//                 return { id: key, selected: i === 0, title: key };
//             }),
//             selectedColumns: initialProject.iterations.map((iteration) => {
//                 return { id: iteration.id, selected: true, title: iteration.title };
//             }),
//             swimlaneTypes: Object.keys(SwimlaneType).map((key, i) => {
//                 let title: string;
//                 switch (key) {
//                     case SwimlaneType.UserStory:
//                         title = 'User Story';
//                         break;
//                     default:
//                         title = key;
//                         break;
//                 }
//                 return { id: key, selected: i === 0, title: title };
//             }),
//             selectedSwimlanes: [],
//             hideEmptySwimlanes: false,
//             selectedTeams: initialProject.teams.map((team) => {
//                 return { id: team.id, selected: true, title: team.title };
//             })
//         };

//         filter.selectedSwimlanes = initSwimlanes(project, filter, filter, {});

//         return filter;
//     };

//     const [filter, setFilter] = useState<IBoardFilter>(initFilter(initialProject));

//     const setFilterPartial = (partialFilter: Partial<IBoardFilter>): void => {
//         setFilter(updateFilter(initialProject, filter, partialFilter));
//     };

//     return [filter, setFilterPartial];

// }

const setFilterPartial = (partialFilter: Partial<IBoardFilter>): void => {
    
};

export const useBoardFilterState = (initialProject: IProject): [IBoardFilter, (partialFilter: Partial<IBoardFilter>) => void] => {
    return [{} as IBoardFilter, setFilterPartial]
}
