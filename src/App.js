import TaskItem from './components/TaskItem/TaskItem';
import './App.css';

function App() {
    const tasks = [
        {
            name: "Paulchen",
            medication: "Medikament 1"
        },
        {
            name: "Pupsi",
            medication: "Medikament 2"
        },
        {
            name: "Schnucki",
            medication: "Medikament 3"
        },
        {
            name: "Socke",
            medication: "Medikament 4"
        }
    ]
  return (
    <div className="App">
        {tasks.map(task => <TaskItem {...task} />)}
    </div>
  );
}

export default App;
