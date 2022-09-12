import Checkbox from "shared/components/Checkbox";
import Multiselect, { MultiselectOption } from "shared/components/Multiselect";

export interface IBoardFilter {
    cardSearchQuery: string | null;
    selectedCardTypes: MultiselectOption[];
    swimlaneTypes: MultiselectOption[];
    selectedSwimlanes: MultiselectOption[];
    hideEmptySwimlanes: boolean;
    columnTypes: MultiselectOption[];
    selectedColumns: MultiselectOption[];
    selectedTeams: MultiselectOption[];
}

export interface IBoardFiltersChangedEvent {
    filters: Partial<IBoardFilter>;
}

export interface IBoardFilterProps {
    filters: IBoardFilter;
    onValueChanges?: (updatedFilters: IBoardFiltersChangedEvent) => void;
}


function BoardFilter(props: IBoardFilterProps) {
    const handleValueChanges = (updatedFilters: IBoardFiltersChangedEvent): void => {
        if (props.onValueChanges) {
            props.onValueChanges(updatedFilters);
        }
    }

    const handleCardSearchQueryChanged = (query: string | null): void => {
        handleValueChanges({
            filters: { cardSearchQuery: query || '' }
        });
    }

    const handleSelectedCardTypesChanged = (selectedCardTypes: MultiselectOption[]): void => {
        handleValueChanges({
            filters: { selectedCardTypes }
        });
    };
    const handleSwimlaneTypesChanged = (swimlaneTypes: MultiselectOption[]): void => {
        handleValueChanges({
            filters: { swimlaneTypes }
        });
    };
    const handleSelectedSwimlanesChanged = (selectedSwimlanes: MultiselectOption[]): void => {
        handleValueChanges({
            filters: { selectedSwimlanes }
        });
    };
    const handleHideEmptySwimlanesChanged = (hideEmptySwimlanes: boolean): void => {
        handleValueChanges({
            filters: { hideEmptySwimlanes }
        });
    };
    const handleColumnTypesChanged = (columnTypes: MultiselectOption[]): void => {
        handleValueChanges({
            filters: { columnTypes }
        });
    };
    const handleSelectedColumnsChanged = (selectedColumns: MultiselectOption[]): void => {
        handleValueChanges({
            filters: { selectedColumns }
        });
    };
    const handleSelectedTeamsChanged = (selectedTeams: MultiselectOption[]): void => {
        handleValueChanges({
            filters: { selectedTeams }
        });
    };

    return (
        <form className='filter'>
                    {/* <header>
                        <h3>Filter</h3>
                    </header> */}

                    <fieldset>
                        <legend>Card Search</legend>
                        <input type='text' placeholder='Search' onChange={(event) => handleCardSearchQueryChanged(event.target.value)} />
                    </fieldset>

                    <fieldset>
                        <legend>Card Types</legend>
                        <Multiselect
                            options={props.filters.selectedCardTypes}
                            onValueChanges={handleSelectedCardTypesChanged}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Swimlanes</legend>
                        <Multiselect
                            options={props.filters.swimlaneTypes}
                            onValueChanges={handleSwimlaneTypesChanged}
                            isSingleSelect={true}
                        />
                        <Multiselect
                            options={props.filters.selectedSwimlanes}
                            onValueChanges={handleSelectedSwimlanesChanged}
                        />
                        <Checkbox
                            label="Hide empty"
                            defaultValue={props.filters.hideEmptySwimlanes}
                            onValueChanges={handleHideEmptySwimlanesChanged}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Columns</legend>
                        <Multiselect
                            options={props.filters.columnTypes}
                            onValueChanges={handleColumnTypesChanged}
                            isSingleSelect={true}
                        />
                        <Multiselect
                            options={props.filters.selectedColumns}
                            onValueChanges={handleSelectedColumnsChanged}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Teams</legend>
                        <Multiselect
                            options={props.filters.selectedTeams}
                            onValueChanges={handleSelectedTeamsChanged}
                        />
                    </fieldset>

                </form>
    )
}

export default BoardFilter;
