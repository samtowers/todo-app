import React, {ReactNode, useState} from "react";

// fixme: Type hint children
// fixme: Trailing `>` in JetBrains.

export default function Tabs({children}: any) {
    const [selected, setSelected] = useState(0);
    return (
        <div>
            <div
                className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
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

export function Tab({name, children}: any) {
    return (
        <li className="mr-2">
            <span
                className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer"
            >
                {name}
            </span>
        </li>
    );
}

