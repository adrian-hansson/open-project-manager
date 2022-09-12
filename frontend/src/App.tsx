import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'App.css';
import { BoardPage } from 'features/board-new/pages/BoardPage';

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>
                </header> */}
                <BoardPage />
            </div>
        </QueryClientProvider>
    );
}

export default App;
