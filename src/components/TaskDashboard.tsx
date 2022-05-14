import React from 'react';
import Tabs, {Tab} from './Tabs'
import Checkboxes, {Checkbox} from "./Checkboxes";
import TaskAdd from "./TaskAdd";
import WarnModal from "./WarnModal";

// st: Tailwind:
// https://tailwindcss.com/docs/guides/create-react-app

const MODAL_DELETE_ALL = 'modal-delete-all';

interface TaskDashboardProps {
    selectedTab: string,
    activeModal?: string,
}

/**
 * Task / to-do list manager.
 * Renders box with three tabs: "All", "Active" and "Completed".
 * Manages task items between pages.
 */
export default class TaskDashboard extends React.Component<any, any> { // <Props, State>
    state = {
        selectedTab: 'All',
        activeModal: null,
    }

    addItem(item: string) {
        console.log('Add item', item)
    }

    showModal(id: string) {
        console.log('YEET', id)
        this.setState({activeModal: id});
        console.log('activeModal', this.state.activeModal)
    }

    setTab(name: string) {
        this.setState({selectedTab: name});
    }
    render() {
        // st: Use over mutator method. Ensure `this` is bound. Saves boilerplate.
        const onTabClick = (name: string) => {
            this.setState({selectedTab: name});
        };
        console.log('this.state.activeModal === MODAL_DELETE_ALL', this.state.activeModal === MODAL_DELETE_ALL)
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
                                onClick={_=> this.showModal(MODAL_DELETE_ALL)}
                            >
                                Delete all
                            </button>
                        </div>
                    </Tab>
                </Tabs>
                <WarnModal
                    id={MODAL_DELETE_ALL}
                    onConfirm={console.log}
                    visible={this.state.activeModal === MODAL_DELETE_ALL}
                    message="Are you sure you want to delete all completed items?"
                />
            </>
        );
    }
}