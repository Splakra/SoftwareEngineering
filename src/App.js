import TaskItem from './components/TaskItem/TaskItem';
import './App.css';

import SetReminder from "./components/AddTherapy/setReminder";
import ChooseProfile from "./components/AddTherapy/chooseProfile";
import ChooseMedication from "./components/AddTherapy/chooseMedication";
import ChooseDose from "./components/AddTherapy/chooseDose";

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
            <ChooseDose/>
        </div>
    );
}

export default App;
