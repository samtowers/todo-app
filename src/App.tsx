import React from 'react';
import TaskDashboard from "./components/TaskDashboard";


// st: Tailwind:
// https://tailwindcss.com/docs/guides/create-react-app

// fixme: Todo centered Layout
// fixme: Style presets built from tailwind utilities? I.e. use @apply
// fixme: Style preset naming convention? BEM?

export default class App extends React.Component<any, any> { // <Props, State>
    render() {
        return (
            <div className="App relative max-w-screen-sm w-full mx-auto xl:px-5 mt-8">
                <header className="App-header">
                    <h1 className="text-center text-5xl font-bold select-none">#todo</h1>
                </header>
                <div className="mt-8">
                    <TaskDashboard/>
                </div>
            </div>
        );
    }
}