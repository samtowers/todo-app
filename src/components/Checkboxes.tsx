export default function Checkboxes({children}: any) {
    return (
        <div>
            {children}
        </div>
    );
}

export function Checkbox({name, value}: any) {
    return (
        <label className="form-check-label inline-block text-gray-800">
            <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value={value}
            />
                {name}
        </label>
    );
}