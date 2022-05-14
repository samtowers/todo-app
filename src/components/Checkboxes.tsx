import './Checkboxes.css'

// fixme: Remove className
export default function Checkboxes({children, className}: any) {
    return (
        <div className={className + ' '}>
            {children}
        </div>
    );
}

export function Checkbox({name, checked, onChange}: any) {
    const completed = checked ? 'completed' : '';
    const className = `${completed} mb-2 px-3 py-1 bg-neutral-50 form-check-label inline-block 
                       text-gray-800 cursor-pointer text-lg w-full`;
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
                        onChange()
                    }
                }}
            />
            {name}
        </label>

    );
}