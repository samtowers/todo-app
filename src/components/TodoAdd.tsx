import React from "react";

/**
 * Text input & button to add to-do items.
 */
export default class TodoAdd extends React.Component<{onItemAdd: Function}> {
    onBtnClick(btn: HTMLButtonElement) {
        const input = btn.previousElementSibling as HTMLInputElement;
        if (!input.value) {
            return;
        }
        this.props.onItemAdd(input.value);
        input.value = '';
    }
    render() {
        return (
            <div className="m-4 flex flex-wrap">
                {/* fixme: Clear option on text input */}
                <input
                    className="py-2 px-3 flex-1 mr-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" placeholder="E.g. Grab pint of milk"/>

                <button
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-400 cursor-pointer"
                    onClick={mouseEvent => this.onBtnClick(mouseEvent.target as HTMLButtonElement)}
                >
                    Add
                </button>
            </div>
        );
    }
}