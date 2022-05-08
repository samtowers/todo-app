import React from 'react';
import './App.css';
import TabList, {Tab} from './components/TabList'
import TodoList, {TodoItem} from "./components/TodoList";

class App extends React.Component<any, any> { // <Props, State>
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    #Todo App
                </header>
                <TabList>
                    <Tab name="All">
                        <TodoList>
                            <TodoItem>Item 1</TodoItem>
                        </TodoList>
                    </Tab>
                    <Tab name="Active">
                        <TodoList>
                            <TodoItem>Item 1</TodoItem>
                        </TodoList>
                    </Tab>
                    <Tab name="Completed">
                        <TodoList>
                            <TodoItem>Item 1</TodoItem>
                        </TodoList>
                        <div className="">
                            <button className="bg-red-500 text-white p-2 rounded hover:bg-red-400 cursor-pointer">
                                delete all
                            </button>
                        </div>
                    </Tab>
                </TabList>
            </div>
        );
    }
}

export default App;
