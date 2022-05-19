import React, {ReactElement} from 'react';
import Tabs, {Tab} from './Tabs'
import TaskAdd from "./TaskAdd";
import WarnModal from "./WarnModal";
import TaskList from "../logic/TaskList";
import Task from "./Task";

// st: Tailwind:
// https://tailwindcss.com/docs/guides/create-react-app

const MODAL_DELETE_ALL = 'modal-delete-all';
const TABS = ['All', 'Active', 'Completed'];

interface TaskDashboardState {
    selectedTab: string,
    activeModal: string | null,
    // fixme: Other projects seem to use context providers for stateful operations
    //  (eg ofnotes; Deleting a note -  ProvideNoteContext & useNoteContext.tsx).
    //  (Uses `deleteNote` callback which handles deletion)
    //  Consider refactoring this based on better React patterns.
    taskList: TaskList,
    screenHeldTasks: Set<number>,
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
        taskList: new TaskList(),
        // Task IDs which must stay on screen, until next tab change. Improves UX.
        // fixme: Immutable?
        screenHeldTasks: new Set<number>()
    }

    constructor(props: any, context: any) {
        super(props, context);
        const [tab, taskList] = this.loadStorage();
        this.state.selectedTab = tab;
        this.state.taskList = taskList;
    }

    addItem(item: string) {
        this.setStoredState({taskList: this.state.taskList.add(item)});
    }

    updateItem(id: number, done: boolean) {
        this.setStoredState({
            taskList: this.state.taskList.update(id, done),
            screenHeldTasks: this.state.screenHeldTasks.add(id),
        });
    }


    // fixme: Use proper type instead of `any`:
    setStoredState(state: any) {
        this.setState(state, () => {
            // fixme: Is this a correct React pattern for storing & loading state changes?
            if (state.hasOwnProperty('taskList')) {
                localStorage['taskList'] = JSON.stringify(this.state.taskList.items);
            }
            if (state.hasOwnProperty('selectedTab')) {
                localStorage['selectedTab'] =  this.state.selectedTab;
            }
        });
    }

    deleteCompletedTasks() {
        this.setStoredState({
            taskList: this.state.taskList.removeDone()
        });
    }

    deleteItem(id: number) {
        this.setStoredState({
            taskList: this.state.taskList.delete(id),
        });
    }

    loadStorage(): [tab: string, taskList: TaskList] {
        let tab = this.state.selectedTab;
        let taskList = this.state.taskList;
        if (TABS.includes(localStorage['selectedTab'])) {
            tab = localStorage['selectedTab'];
        }
        try {
            // fixme: Sanitize localStorage?
            taskList = new TaskList(JSON.parse(String(localStorage['taskList'] || '{}')));
        } catch (e){
            console.error(e);
        }
        return [tab, taskList];
    }

    /**
     * @param filterDone Set to apply filter. Omit to NOT filter at all on `done` property.
     * @param showDeleteBtn
     */
    * renderCheckboxes(filterDone?: boolean, showDeleteBtn = false): Generator<ReactElement> {
        for (const [strId, item] of Object.entries(this.state.taskList.items)) {
            const id = Number(strId);
            // "Screen Held" tasks IGNORE filters. They must be shown on screen, to aid UX.
            const isScreenHeld = this.state.screenHeldTasks.has(id);
            if (!isScreenHeld && filterDone !== undefined && item.done !== filterDone) {
                continue;
            }
            // st: Note: `key` must be set here, instead of in `Task` itself (e.g. the div).
            //     Otherwise react generates a warning.
            yield <Task
                key={id}
                id={id}
                name={item.name}
                checked={item.done}
                showDelete={showDeleteBtn}
                onChange={(checked: boolean) => this.updateItem(id, checked)}
                onDelete={(id: number) => this.deleteItem(id)}
            />;
        }
    }

    render() {
        const hasDoneTasks = Array.from(this.state.taskList.filterItems(true)).length > 0;
        // st: Use over mutator method. Ensure `this` is bound. Saves boilerplate.
        const onTabClick = (name: string) => {
            this.setStoredState({
                selectedTab: name,
                screenHeldTasks: new Set<number>(),
            });
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
                        {
                            // st: Make sure to set `key`. Otherwise, checkboxes (and checked state) might get recycled
                            //      between tabs.
                            //     `key` can be set on container <Checkboxes> or on each individual <checkbox>.
                            // https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements
                        }
                        <div>
                            {Array.from(this.renderCheckboxes())}
                        </div>
                    </Tab>
                    <Tab name="Active" onClick={onTabClick}>
                        <TaskAdd onItemAdd={(item: string) => this.addItem(item)}/>
                        <div>
                            {Array.from(this.renderCheckboxes(false))}
                        </div>
                    </Tab>
                    <Tab name="Completed" onClick={onTabClick}>
                        <div>
                            {Array.from(this.renderCheckboxes(true, true))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                disabled={!hasDoneTasks}
                                className={(hasDoneTasks ? 'bg-red-500 hover:bg-red-400' : 'bg-gray-500 hover:bg-gray-400') + ' py-2 px-4 text-white p-2 rounded  cursor-pointer'}
                                onClick={() => this.setStoredState({activeModal: MODAL_DELETE_ALL})}
                            >
                                Delete completed
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
