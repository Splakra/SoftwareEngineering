import TaskItem from './components/TaskItem/TaskItem';
import './App.css';
import ChooseProfile from "./components/AddTherapy/ChooseProfile";
import ChooseMedication from "./components/AddTherapy/ChooseMedication";
import Dashboard from "./dashboard/Dashboard";

function App() {
    const tasks = [
        {
            name: "Paulchen",
            medication: "Schmerzmittel",
            time: "08:00"
        },
        {
            name: "Pupsi",
            medication: "Polysulfated Glycosaminodinolinoglycan",
            time: "09:00"
        },
        {
            name: "Schnucki",
            medication: "Vitaminpräparat",
            time: "13:30"
        },
        {
            name: "Socke",
            medication: "Augensalbe",
            time: "18:15"
        }
    ]
    return (
        <div className="App">
            <Dashboard/>
        </div>
    );
}

export default App;
