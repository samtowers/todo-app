import React from 'react';
import Tabs, {Tab} from './Tabs'
import Checkboxes, {Checkbox} from "./Checkboxes";
import TodoAdd from "./TodoAdd";

// st: Tailwind:
// https://tailwindcss.com/docs/guides/create-react-app

// fixme: Rename "Todo" to Task
/**
 * To-do list manager.
 * Renders box with three tabs: "All", "Active" and "Completed".
 * Manages to-do items between pages.
 */
export default class Todo extends React.Component<any, any> { // <Props, State>
    state = {
        selectedTab: 'All',
    }
    addItem(item: string) {
        console.log('Add item', item)
    }
    render() {
        // st: Use over mutator method. To ensure `this` is bound.
        const onTabClick = (name: string) => {
            this.setState({selectedTab: name});
        };
        return (
            <Tabs selectedTab={this.state.selectedTab}>
                {/* fixme: simplify onClick? */}
                {/*
                st: Note: Multiple ways of handling tabs here.
                1. Handle selected tab per <Tab> entry here. Handle display at CSS level.
                2. Handle selected tab at <Tabs> level. Need to re-render each <Tab> though to set CSS attributes.
                React is a frontend framework. Idea likely is to keep logic/state as minimal as possible. Hence, why
                state is made monolithic to the container elements.
                */}

                <Tab name="All" onClick={onTabClick}>
                    <TodoAdd onItemAdd={(item: string) => this.addItem(item)}/>
                    <Checkboxes>
                        <Checkbox name="Item in All" checked={true} />
                    </Checkboxes>
                </Tab>
                <Tab name="Active" onClick={onTabClick}>
                    <Checkboxes>
                        <Checkbox name="Item in Active"/>
                    </Checkboxes>
                </Tab>
                <Tab name="Completed" onClick={onTabClick}>
                    <Checkboxes>
                        <Checkbox name="Item in Completed"/>
                    </Checkboxes>
                    <div className="flex justify-end">
                        <button className="py-2 px-4 bg-red-500 text-white p-2 rounded hover:bg-red-400 cursor-pointer">
                            Delete all
                        </button>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}