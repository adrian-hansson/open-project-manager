import { useId } from "react";

export interface ICheckboxProps {
    label?: string;
    defaultValue: boolean;
    onValueChanges?: (value: boolean) => any;
}

function Checkbox(props: ICheckboxProps) {

    const id: string = useId();

    const handleOnChange = (event: any) => {
        const isChecked: boolean = event && event.target && event.target.checked;

        if (props.onValueChanges) {
            props.onValueChanges(isChecked)
        }
    }

    return (
        <>
            {props.label && <label htmlFor={id}>{props.label}</label>}
            <input
                id={id}
                type="checkbox"
                onChange={handleOnChange}
                defaultValue={props.defaultValue ? 1 : 0}
            />
        </>
    );
}

export default Checkbox;
