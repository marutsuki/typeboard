import './App.css';
import Whiteboard from './whiteboard/Whiteboard';

function App() {
    return (
		<>
			<header className='h-16 text-md my-auto mx-4'>
				<h1>TypeBoard</h1>
			</header>
			<main className='w-full h-full'>
				<Whiteboard />
			</main>
		</>
    );
}

export default App;
