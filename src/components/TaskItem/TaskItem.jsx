import {useState} from "react";
import PawIcon from "../../assets/paw.svg";
import Checkmark from "../../assets/checkmark.svg";
import "./TaskItem.css";

export default function TaskItem({patient, medication, time, showTime}) {
    const [checked, setChecked] = useState(false);
    const [checkedDate, setCheckedDate] = useState(null);
    const handleChecked = () => {
        const date = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
        setChecked(true);
        setCheckedDate(date);
    }
    const status = checked ? `Eingenommen: ${checkedDate}` : "Ausstehend";
    return (
        <div className={`task-item ${checked ? "task-item--checked" : ""}`}>
            <div className={"task-item__time"}>
                {showTime && time}
                {/* time will only be shown if showTime is true */}
            </div>
            <button onClick={handleChecked} className={"task-item__button"}>
                <div className={"task-item__infos"}>
                    <div className={"task-item__profile"}>
                        <img alt="" className={"task-item__icon"} src={PawIcon}/>
                        {patient.name}
                    </div>
                    <div className={"task-item__medication"}>
                        {medication.name}
                    </div>
                    <div className={"task-item__status"}>
                        {status}
                    </div>
                </div>
                <div className="task-item__checkmark-wrapper">
                    <img alt="" className="task-item__checkmark" src={Checkmark}/>
                </div>
            </button>
        </div>
    )
}