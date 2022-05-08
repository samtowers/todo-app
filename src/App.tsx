import React from 'react';
import './App.css';
import Todo from "./components/Todo";


// st: Tailwind:
// https://tailwindcss.com/docs/guides/create-react-app

// fixme: Todo centered Layout

export default class App extends React.Component<any, any> { // <Props, State>
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    #Todo App
                </header>
                <Todo/>
            </div>
        );
    }
}