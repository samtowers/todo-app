import React, {ReactElement} from "react";

// fixme: Type hint children
// fixme: Trailing `>` in JetBrains.
// fixme: Default `prop={}` in JetBrains.
// fixme: Elegant tab switching. Use animation to avoid jarring action.

export default function Tabs({children, selectedTab}: any) {
    // Set `selected` prop for children:
    const newChildren = React.Children.map(children, child => {
        return React.cloneElement(child, {
            'selected': selectedTab === child.props.name
        });
    });
    console.log('tabs render', selectedTab);
    console.log('newChildren', newChildren);
    return (
        <div className="Tabs">
            <div
                className="text-sm font-medium text-center text-gray-800 border-b border-gray-400 ">
                <ul className="flex flex-wrap -mb-px">
                    {newChildren}
                </ul>
            </div>
            <div>
                {newChildren.find((child: ReactElement) => child.props.selected)?.props.children}
            </div>
        </div>
    );
}

export function Tab({name, selected, onClick}: any) {
    const border = selected ? ' border-blue-400 ' : '';
    // fixme: JetBrains: autocomplete tailwind in strings?
    const className = border + 'w-full inline-block p-4 rounded-t-lg border-b-2 hover:text-gray-400 ' +
        'cursor-pointer hover:border-gray-400';

    return (
        // fixme: best practice: Data props in CSS selectors?
        // st: Interpolation: {name} string with spaces in - this will ADD QUOTES to strings passed this way.
        //     To ensure they do not break out of the attribute value.

        // NB: Passing onClick here does actually work as expected. If sending mouse event. Of course, to send
        //     another value you will still need an anonymous function.
        <li className="Tab flex-1 flex" key={name} data-name={name} onClick={e => onClick(name)}>
            <a className={className}>
                {name}
            </a>
        </li>
    );
}

