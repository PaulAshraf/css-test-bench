import { TodoProvider } from './contexts/TodoContext';
import AppLayout from './components/Layout/AppLayout';
import TodoApp from './components/Todo/TodoApp';

function App() {
  return (
    <TodoProvider>
      <AppLayout>
        <TodoApp />
      </AppLayout>
    </TodoProvider>
  );
}

export default App;