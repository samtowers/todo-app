// fixme: Remove className
export default function Checkboxes({children, className}: any) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export function Checkbox({name, checked, onChange}: any) {
    return (
        <label className="form-check-label inline-block text-gray-800 cursor-pointer m-4 text-lg">
            <input
                className="form-check-input h-4 w-4 mr-2"
                type="checkbox"
                defaultChecked={checked}
                onChange={onChange}
            />
            {name}
        </label>
    );
}