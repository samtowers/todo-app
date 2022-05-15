import './Checkbox.css'

export interface CheckboxProps {
    name: string,
    checked: boolean,
    onChange: (checked: boolean) => any,
}


// fixme: Shift+click to multi toggle checkboxes?

export default function Checkbox({name, checked, onChange}: CheckboxProps) {
    const completed = checked ? 'completed' : '';
    const className = `${completed} mb-2 px-3 py-1 bg-neutral-50 form-check-label inline-block 
                       text-gray-800 cursor-pointer text-lg w-full overflow-hidden`;
    return (
        <label className={className}>
            <input
                className="form-check-input h-4 w-4 mr-2"
                type="checkbox"
                defaultChecked={checked}
                onChange={event => {
                    const box = event.target;
                    box.parentElement?.classList.toggle('completed', box.checked);
                    if (onChange) {
                        onChange(box.checked)
                    }
                }}
            />
            {name}
        </label>

    );
}