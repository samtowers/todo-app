import React from "react";

// fixme: Keyboard events. Enter & optionally Esc.

interface ClassAddProps {
    onItemAdd: Function,
}

/**
 * Text input & button to add to-do items.
 */
export default function TaskAdd({onItemAdd}: ClassAddProps) {
    const processInput = (input: HTMLInputElement) => {
        if (!input.value) {
            return;
        }
        onItemAdd(input.value);
        input.value = '';
    }
    return (
        <div className="flex flex-wrap mb-3">
            <input
                className="py-2 px-3 flex-1 mr-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                onKeyUp={ev => {
                    if (ev.key === 'Enter') {
                        processInput(ev.target as HTMLInputElement)
                    }
                }}
                placeholder="E.g. Grab pint of milk"
            />

            <button
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-400 cursor-pointer"
                onClick={ev => {
                    let input = (ev.target as Element).previousElementSibling as HTMLInputElement;
                    processInput(input);
                }}
            >
                Add
            </button>
        </div>
    );
}