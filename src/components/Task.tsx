import Checkbox, {CheckboxProps} from "./Checkbox";

interface TaskProps extends CheckboxProps {
    id: number,
    showDelete: boolean,
    onDelete: (id: number) => any,
}

export default function Task({id, name, checked, onChange, onDelete, showDelete = true}: TaskProps) {
    const hideDelete = showDelete ? '' : 'hidden';
    return (
        <div className="">
            <Checkbox
                name={name}
                checked={checked}
                onChange={onChange}
            />
            {/* fixme: Move to assets: */}
            {/* st: Use <button> over <a>. As <button> doesn't need a `href` value, whereas <a> expects one. */}
            <button className={`${hideDelete} absolute right-11 mt-1`} onClick={() => onDelete(id)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </button>
        </div>

    );
}