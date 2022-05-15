
// fixme: File structure for logic classes?

export interface Task {
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
export default class TaskList {
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

    // public static sanitize(items: any) {
    //     const entries = Object.entries(items);
    //     if (entries.length < 1) {
    //         return {};
    //     }
    //     if (Number.isNaN(entries[0][0])) {
    //         return {}
    //     }
    //     if (items.hasOwnProperty(0)) {
    //
    //     }
    // }

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

    public update(id: number, done: boolean): TaskList {
        let newItems = {...this.items};
        // Update task:
        // st: NB: First arg in `Object.assign` will NOT be cloned, but updated. Which is bad for immutability.
        //         Hence first arg `{}` here.
        newItems[id] = Object.assign({}, newItems[id], {done})
        return new TaskList(newItems);
    }

    public delete(id: number) {
        let newItems = {...this.items};
        delete newItems[id];
        // fixme: Return self?
        return new TaskList(newItems);
    }

    public removeDone(): TaskList {
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