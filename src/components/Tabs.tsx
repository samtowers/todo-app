import React from "react";

// https://stackoverflow.com/questions/49144169/react-typescript-parameter-props-implicitly-has-an-any-type-error
// https://stackoverflow.com/questions/52735288/why-does-parameter-props-implicitly-has-an-any-type

// class Tab extends React.Component<any, any> {
//     state = {
//         selectedTab: 0
//     };
//     render() {
//         return (
//             // todo: semantic html?
//             <div>
//                 <ul>
//                     <li>Tab 1</li>
//                 </ul>
//                 {this.props.children}
//             </div>
//         );
//     }
// }

export default class Tabs extends React.Component<any, any> {
    render() {
        return (
            <div className="text-sm  font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex justify-evenly flex-wrap -mb-px">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export function Tab(props: any) {
    return (
        <li className="mr-2">
            <span className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                {props.name}
            </span>
        </li>
    );
}