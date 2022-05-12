import React, {ReactNode, useState} from "react";

// fixme: Type hint children
// fixme: Trailing `>` in JetBrains.

export default function Tabs({children}: any) {
    // fixme: Trying to update props on children.
    //        LIFT STATE UPTO `Todo.tsx`. Manage selected tab in there.
    //        You can supply helper functions from Tabs.tsx if needed.
    //        Use `display: none` to toggle tabs.
    // children[selected].props = {selected: true};
    // console.log(children);
    return (
        <div>
            <div
                className="text-sm font-medium text-center text-gray-800 border-b border-gray-400 ">
                <ul className="flex justify-evenly flex-wrap -mb-px">
                    {children}
                </ul>
            </div>
            <div>
                {children[selected].props.children}
            </div>
        </div>
    );
}

export function Tab({name, selected}: any) {
    const border = selected ? ' border-blue-400 ' : '';
    return (
        <li className="mr-2">
            <span
                className={border + ' inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-400 cursor-pointer hover:border-gray-400'}
            >
                {name}
            </span>
        </li>
    );
}

