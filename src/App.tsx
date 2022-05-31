import React from 'react';
import TaskDashboard from "./components/TaskDashboard";

// st: Tailwind:
// https://tailwindcss.com/docs/guides/create-react-app

// fixme: Style presets built from tailwind utilities? I.e. use @apply
// fixme: Style preset naming convention? BEM?

const URL_CHALLENGE = 'https://devchallenges.io/challenges/hH6PbOHBdPm6otzw2De5';
const URL_REPO = 'https://github.com/samtowers/todo-app';
const URL_AUTHOR = 'https://github.com/samtowers';

export default function App() {
    return (
        <div className="App relative max-w-screen-sm w-full mx-auto xl:px-5 flex flex-col h-screen">
            <header className="App-header mt-8">
                <h1 className="text-center text-5xl font-bold select-none">#todo</h1>
            </header>
            <main className="mt-8 grow">
                <TaskDashboard/>
            </main>
            <footer className="text-center p-4">
                A <a href={URL_CHALLENGE} target="_blank">DevChallenge</a> solution - <a href={URL_REPO} target="_blank">source</a> - <a href={URL_AUTHOR} target="_blank">@samtowers</a>
            </footer>
        </div>
    );
}