import React from 'react';
import Tabs, {Tab} from './Tabs'
import Checkboxes, {Checkbox} from "./Checkboxes";

// st: Tailwind:
// https://tailwindcss.com/docs/guides/create-react-app

export default class Todo extends React.Component<any, any> { // <Props, State>
    state = {
        selectedTab: 'All',
    }
    isSelected(name: string): boolean {
        return this.state.selectedTab === name;
    }
    selectTab(name: string) {
        this.state.selectedTab = name;
    }
    render() {
        return (
            <Tabs>
                {/* fixme: boilerplate */}
                <Tab
                    name="All"
                    selected={this.isSelected('All')}
                    onClick={(name: string) => this.selectTab(name)}
                >
                    <Checkboxes>
                        <Checkbox name="Item in All" checked={true} />
                    </Checkboxes>
                </Tab>
                 <Tab
                    name="Active"
                    selected={this.isSelected('Active')}
                    onClick={(name: string) => this.selectTab(name)}
                >
                    <Checkboxes>
                        <Checkbox name="Item in Active"/>
                    </Checkboxes>
                </Tab>
                 <Tab
                    name="All"
                    selected={this.isSelected('Completed')}
                    onClick={(name: string) => this.selectTab(name)}
                >
                    <Checkboxes>
                        <Checkbox name="Item in Completed"/>
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