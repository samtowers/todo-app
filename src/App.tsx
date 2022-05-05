import React from 'react';
import './App.css';
import Tabs from './components/Tabs'

class App extends React.Component<any, any> { // <Props, State>
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    #Todo App
                </header>
                <Tabs>
                    <p>Tab A.</p>
                    <p>Tab B.</p>
                </Tabs>
            </div>
        );
    }
}

export default App;
