import React from "react";

// fixme: Keyboard events. Enter & optionally Esc.


/**
 * Text input & button to add to-do items.
 */
export default class TaskAdd extends React.Component<{ onItemAdd: Function }> {

    private onInputKeyUp(ev: React.KeyboardEvent<HTMLInputElement>) {
        if (ev.key !== 'Enter') {
            return;
        }
        this.processInput(ev.target as HTMLInputElement)
    }

    private processInput(input: HTMLInputElement) {
        if (!input.value) {
            return;
        }
        this.props.onItemAdd(input.value);
        input.value = '';
    }

    render() {
        return (
            <div className="flex flex-wrap mb-3">
                {/* st: Clear option only available on type=search. Do not include this. */}
                <input
                    className="py-2 px-3 flex-1 mr-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onKeyUp={ev => this.onInputKeyUp(ev)}
                    placeholder="E.g. Grab pint of milk"
                />

                <button
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-400 cursor-pointer"
                    // fixme: More elegant approach?
                    onClick={ev => this.processInput((ev.target as HTMLButtonElement).previousElementSibling as HTMLInputElement)}
                >
                    Add
                </button>
            </div>
        );
    }
}