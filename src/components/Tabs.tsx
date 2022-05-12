import React, {ReactElement} from "react";

// fixme: Type hint children
// fixme: Trailing `>` in JetBrains.

export default function Tabs({children, selectedTab}: any) {
    // Set `selected` prop for children:
    const newChildren = React.Children.map(children, child => {
        return React.cloneElement(child, {
            'selected': selectedTab === child.name
        });
    });
    return (
        <div className="Tabs">
            <div
                className="text-sm font-medium text-center text-gray-800 border-b border-gray-400 ">
                <ul className="flex justify-evenly flex-wrap -mb-px">
                    {newChildren}
                </ul>
            </div>
            <div>
                {newChildren.find((child: ReactElement) => child.props.selected)}
            </div>
        </div>
    );
}

export function Tab({name, selected}: any) {
    const border = selected ? ' border-blue-400 ' : '';
    return (
        // fixme: best practice: Data props in CSS selectors?
        // st: Interpolation: {name} string with spaces in - this will ADD QUOTES to strings passed this way.
        //     To ensure they do not break out of the attribute value.
        <li className="Tab mr-2" key={name} data-name={name}>
            <span
                className={border + ' inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-400 cursor-pointer hover:border-gray-400 '}
            >
                {name}
            </span>
        </li>
    );
}

