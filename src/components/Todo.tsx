import React from 'react';
import Tabs, {Tab} from './Tabs'
import Checkboxes, {Checkbox} from "./Checkboxes";

// st: Tailwind:
// https://tailwindcss.com/docs/guides/create-react-app

export default class Todo extends React.Component<any, any> { // <Props, State>
    render() {
        return (
            <Tabs>
                <Tab name="All">
                    <Checkboxes>
                        <Checkbox>Item 1</Checkbox>
                    </Checkboxes>
                </Tab>
                <Tab name="Active">
                    <Checkboxes>
                        <Checkbox>Item 1</Checkbox>
                    </Checkboxes>
                </Tab>
                <Tab name="Completed">
                    <Checkboxes>
                        <Checkbox>Item 1</Checkbox>
                    </Checkboxes>
                    <div className="">
                        <button className="bg-red-500 text-white p-2 rounded hover:bg-red-400 cursor-pointer">
                            delete all
                        </button>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}