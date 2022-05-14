import React from 'react';
import Tabs, {Tab} from './Tabs'
import Checkboxes, {Checkbox} from "./Checkboxes";
import TaskAdd from "./TaskAdd";
import WarnModal from "./WarnModal";

// st: Tailwind:
// https://tailwindcss.com/docs/guides/create-react-app

const MODAL_DELETE_ALL = 'modal-delete-all';

interface TaskDashboardState {
    selectedTab: string,
    activeModal: string | null,
}

/**
 * Task / to-do list manager.
 * Renders box with three tabs: "All", "Active" and "Completed".
 * Manages task items between pages.
 */
export default class TaskDashboard extends React.Component<any, TaskDashboardState> {
    state = {
        selectedTab: 'All',
        activeModal: null,
    }
    addItem(item: string) {
        console.log('Add item', item)
    }
    deleteCompletedTasks() {
        console.log('deleteCompletedTasks');
    }
    render() {
        // st: Use over mutator method. Ensure `this` is bound. Saves boilerplate.
        const onTabClick = (name: string) => {
            this.setState({selectedTab: name});
        };
        return (
            <>
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
                        <TaskAdd onItemAdd={(item: string) => this.addItem(item)}/>
                        <Checkboxes>
                            <Checkbox name="Item in All" checked={true}/>
                            <Checkbox name="2nd Item in All" checked={false}/>
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
                            <button
                                className="py-2 px-4 bg-red-500 text-white p-2 rounded hover:bg-red-400 cursor-pointer"
                                onClick={() => this.setState({activeModal: MODAL_DELETE_ALL})}
                            >
                                Delete all
                            </button>
                        </div>
                    </Tab>
                </Tabs>
                <WarnModal
                    id={MODAL_DELETE_ALL}
                    onConfirm={() => {
                        this.deleteCompletedTasks();
                        this.setState({activeModal: null});
                    }}
                    onCancel={() => this.setState({activeModal: null})}
                    visible={MODAL_DELETE_ALL === this.state.activeModal}
                    message="Are you sure you want to delete all completed items?"
                />
            </>
        );
    }
}