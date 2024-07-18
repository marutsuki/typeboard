import { Provider } from 'react-redux';
import './App.css';
import Whiteboard from './whiteboard/Whiteboard';
import store from './store';
import ToolsMenu from './whiteboard/tools/ToolsMenu';

function App() {
    return (
        <Provider store={store}>
            <header className="h-16 text-md my-auto mx-4">
                <h1>TypeBoard</h1>
            </header>
            <main className="w-full h-full flex">
                <ToolsMenu tools={[]} />
                <Whiteboard />
            </main>
        </Provider>
    );
}

export default App;
