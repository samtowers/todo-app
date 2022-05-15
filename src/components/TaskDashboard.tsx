import React, {ReactElement} from 'react';
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

    addItem(item: string) {
        this.setState({taskList: this.state.taskList.add(item)});
    }

    updateItem(id: number, done: boolean) {
        this.setState({
            taskList: this.state.taskList.update(id, done),
            screenHeldTasks: this.state.screenHeldTasks.add(id),
        });
    }

    deleteCompletedTasks() {
        this.setState({
            taskList: this.state.taskList.removeDone()
        });
    }

    /**
     * @param filterDone Set to apply filter. Omit to NOT filter at all on `done` property.
     */
    * renderCheckboxes(filterDone?: boolean): Generator<ReactElement> {
        for (const [strId, task] of Object.entries(this.state.taskList.items)) {
            const id = Number(strId);
            // "Screen Held" tasks IGNORE filters. They must be shown on screen, to aid UX.
            const isScreenHeld = this.state.screenHeldTasks.has(id);
            if (!isScreenHeld && filterDone !== undefined && task.done !== filterDone) {
                continue;
            }
            yield <Checkbox
                key={id}
                name={task.name}
                checked={task.done}
                onChange={(checked: boolean) => this.updateItem(id, checked)}
            />;
        }
    }

    render() {
        const hasDoneTasks = Array.from(this.state.taskList.filterItems(true)).length > 0;
        // st: Use over mutator method. Ensure `this` is bound. Saves boilerplate.
        const onTabClick = (name: string) => {
            this.setState({
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
                        <Checkboxes>
                            {Array.from(this.renderCheckboxes())}
                        </Checkboxes>
                    </Tab>
                    <Tab name="Active" onClick={onTabClick}>
                        <Checkboxes>
                            {Array.from(this.renderCheckboxes(false))}
                        </Checkboxes>
                    </Tab>
                    <Tab name="Completed" onClick={onTabClick}>
                        <Checkboxes>
                            {Array.from(this.renderCheckboxes(true))}
                        </Checkboxes>
                        <div className="flex justify-end">
                            <button
                                disabled={!hasDoneTasks}
                                className={(hasDoneTasks ? 'bg-red-500 hover:bg-red-400' : 'bg-gray-500 hover:bg-gray-400') + ' py-2 px-4 text-white p-2 rounded  cursor-pointer'}
                                onClick={() => this.setState({activeModal: MODAL_DELETE_ALL})}
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

// fixme: File structure for logic classes?

interface Task {
    name: string,
    done: boolean,
}

// fixme: Use of `Map`? Or different approach?
/**
 * Tasks in array must be `id` order ascending.
 */
// interface TaskListData {
//     [id: number]: Task
// }

/**
 * Immutable list of task item.
 */
class TaskList {
    // fixme: Use internal autoincrement pointer? E.g. if user deletes most recent.
    //  Check React 'key' behaviour w/ new items.
    // Explicit incrementing ID. Used for react keys.
    public readonly items;

    /**
     * @param items
     */
    // st: https://stackoverflow.com/questions/36467469/is-key-value-pair-available-in-typescript
    constructor(items?: { [id: number]: Task }) {
        this.items = items || {};
    }

    // fixme: Remove unused:
    public* filterItems(done: boolean): Generator<[id: number, task: Task]> {
        for (const [id, task] of Object.entries(this.items)) {
            if (task.done === done) {
                yield [Number(id), task];
            }
        }
    }

    public add(name: string, done: boolean = false): TaskList {
        let newItems = {...this.items};
        newItems[this.getLastId() + 1] = {name, done};
        return new TaskList(newItems);
    }

    // fixme: Use of shallow copies?
    public remove(id: number): TaskList {
        let newItems = {...this.items}; // Shallow clone items.
        delete newItems[id];
        return new TaskList(newItems);
    }

    update(id: number, done: boolean): TaskList {
        let newItems = {...this.items};
        // Update task:
        // st: NB: First arg in `Object.assign` will NOT be cloned, but updated. Which is bad for immutability.
        //         Hence first arg `{}` here.
        newItems[id] = Object.assign({}, newItems[id], {done})
        return new TaskList(newItems);
    }

    removeDone(): TaskList {
        let newItems = {...this.items};
        for (let id in newItems) {
            if (newItems[id].done) {
                delete newItems[id];
            }
        }
        return new TaskList(newItems);
    }

    private getLastId(): number {
        // `Object.keys`: object key order is well-defined for integers keys in ES2020. Ascending order is expected.
        // See: https://stackoverflow.com/questions/30076219/
        const keys = Object.keys(this.items);
        if (keys.length === 0) {
            return 0;
        }
        return Number(keys[keys.length - 1]);
    }
}