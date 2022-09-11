
export interface MultiselectOption {
    id: string | number;
    title: string;
    value: any;
    selected?: boolean;
}

export interface IMultiselectProps {
    options: MultiselectOption[];
    onValueChanges?: (options: MultiselectOption[], firstTrueOption: MultiselectOption | undefined, value: any | undefined) => void;
    isSingleSelect?: boolean;
}

function Multiselect(props: IMultiselectProps) {

    const handleOnChange = (event: any) => {
        const newOptions: MultiselectOption[] = Array.from(event.target.options).map((option: any, index: any) => {
            const newOption: MultiselectOption = { ...props.options[index] };
            newOption.selected = option.selected;
            return newOption;
        });

        // setOptions(newOptions);

        if (props.onValueChanges) {
            props.onValueChanges(newOptions, newOptions.find(option => option.selected), newOptions.find(option => option.selected)?.value);
        }
    }

    return (
        <select
            className='Multiselect'
            onChange={handleOnChange}
            multiple={!props.isSingleSelect}
            value={props.isSingleSelect ? props.options.find(option => option.selected)?.id : undefined}
        >
            {props.options.map(option => (
                <option
                    key={option.id}
                    value={option.id}
                    selected={!props.isSingleSelect ? option.selected : undefined
                }>
                    {option.title.length > 10 ? option.title.slice(0, 30) + '...' : option.title}
                </option>
            ))}
        </select>
    );
}

export default Multiselect;
