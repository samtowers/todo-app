import React, {ReactElement, useEffect, useState} from 'react';
import Tabs, {Tab} from './Tabs'
import TaskAdd from "./TaskAdd";
import WarnModal from "./WarnModal";
import TaskList from "../logic/TaskList";
import Task from "./Task";

const MODAL_DELETE_ALL = 'modal-delete-all';

/**
 * Task / to-do list manager.
 * Renders box with three tabs: "All", "Active" and "Completed".
 * Manages task items between pages.
 */
export default function TaskDashboard() {
    const store = loadStorage();
    console.log('loadStorage', store);

    const [selectedTab, setSelectedTab] = useState<string>(store.selectedTab ?? 'All');
    const [taskList, setTaskList] = useState<TaskList>(store.taskList ?? new TaskList());
    // Task IDs "held" on screen. Render these irrespective of "done" status:
    const [screenHeld, setScreenHeld] = useState<Set<number>>(new Set<number>());
    const [activeModal, setActiveModal] = useState<string>('');

    // Update localStorage to reflect taskList:
    useEffect(() => {
        console.log('useEffect TaskList start. Store:', localStorage);
        localStorage['taskList'] = JSON.stringify(taskList.items);
    }, [taskList]);
    useEffect(() => {
        console.log('useEffect selectedTab start. Store:', localStorage);
        localStorage['selectedTab'] = selectedTab;
    }, [selectedTab]);

    /**
     * @param filterDone Filter checkbox `done` state to this value. Omit to NOT filter at all.
     * @param showDeleteBtn
     */
    function* renderCheckboxes(filterDone?: boolean, showDeleteBtn = false): Generator<ReactElement> {
        for (const [strId, item] of Object.entries(taskList.items)) {
            const id = Number(strId);
            // "Screen Held" tasks IGNORE filters. They must be shown on screen, to improve UX.
            if (!screenHeld.has(id) && filterDone !== undefined && item.done !== filterDone) {
                continue;
            }
            // st: Note: `key` must be set here, instead of in `Task` itself (e.g. the div).
            //     Otherwise react still generates a warning.
            yield <Task
                key={id}
                id={id}
                name={item.name}
                checked={item.done}
                showDelete={showDeleteBtn}
                onChange={(checked: boolean) => {
                    setTaskList(taskList.update(id, checked));
                    setScreenHeld(screenHeld.add(id));
                }}
                onDelete={(id: number) => {
                    setTaskList(taskList.delete(id));
                }}
            />;
        }
    }

    function onTabClick(name: string){
        setSelectedTab(name);
        setScreenHeld(new Set<number>()); // Reset screen held.
    }

    const hasDoneTasks = Array.from(taskList.filterItems(true)).length > 0;

    return (
        <>
            <Tabs selectedTab={selectedTab}>
                <Tab
                    name="All"
                    onClick={onTabClick}
                >
                    <TaskAdd onItemAdd={(item: string) => setTaskList(taskList.add(item))}/>
                    {
                        // st: Make sure to set `key`. Otherwise, checkboxes (and checked state) might get recycled
                        //      between tabs.
                        //     `key` can be set on container <Checkboxes> or on each individual <checkbox>.
                        // https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements
                    }
                    <div>
                        {Array.from(renderCheckboxes())}
                    </div>
                </Tab>
                <Tab
                    name="Active"
                    onClick={onTabClick}
                >
                    <TaskAdd onItemAdd={(item: string) => setTaskList(taskList.add(item))}/>
                    <div>
                        {Array.from(renderCheckboxes(false))}
                    </div>
                </Tab>
                <Tab
                    name="Completed"
                    onClick={onTabClick}
                >
                    <div>
                        {Array.from(renderCheckboxes(true, true))}
                    </div>
                    <div className="flex justify-end">
                        <button
                            disabled={!hasDoneTasks}
                            className={(hasDoneTasks ? 'bg-red-500 hover:bg-red-400' : 'bg-gray-500 hover:bg-gray-400') + ' py-2 px-4 text-white p-2 rounded  cursor-pointer'}
                            onClick={() => setActiveModal(MODAL_DELETE_ALL)}
                        >
                            Delete completed
                        </button>
                    </div>
                </Tab>
            </Tabs>
            <WarnModal
                id={MODAL_DELETE_ALL}
                onConfirm={() => {
                    setTaskList(taskList.removeDone());
                    setActiveModal('');
                }}
                onCancel={() => setActiveModal('')}
                visible={activeModal === MODAL_DELETE_ALL}
                message="Are you sure you want to delete all completed items?"
            />
        </>
    );
}

/**
 * Get user's taskList/open tab from localStorage.
 */
function loadStorage(): { selectedTab?: string, taskList?: TaskList } {
    let tab = undefined;
    let taskList = undefined;
    if (['All', 'Active', 'Completed'].includes(localStorage['selectedTab'])) {
        tab = localStorage['selectedTab'];
    }
    try {
        // fixme: Sanitize localStorage?
        const items = JSON.parse(String(localStorage['taskList'] || 'null'));
        if (items) {
            taskList = new TaskList(items);
        }
    } catch (e) {
        console.error(e);
    }
    return {selectedTab: tab, taskList};
}
