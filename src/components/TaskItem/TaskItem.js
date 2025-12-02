import {useState} from "react";
import PersonIcon from "../../assets/person-round.svg";
import Checkmark from "../../assets/checkmark.svg";
import "./TaskItem.css";

export default function TaskItem ({name, medication}) {
    const [checked, setChecked] = useState(false);
    const [checkedDate, setCheckedDate] = useState(null);
    const handleChecked = () => {
        const date = new Date().toLocaleTimeString();
        setChecked(true);
        setCheckedDate(date);
    }
    const status = checked ? `Eingenommen: ${checkedDate}` : "Ausstehend";
    return (
        <div className={"task-item"}>
            <div className={"task-item__infos"}>
                <div className={"task-item__profile"}>
                    <div className={"task-item__icon"}>
                        <img alt="" className={"task-item__person"} src={PersonIcon}/>
                    </div>
                    {name}
                </div>
                <div className={"task-item__medication"}>
                    {medication}
                </div>
                <div className={"task-item__status"}>
                    {status}
                </div>
            </div>
            <button onClick={handleChecked} className={"task-item__button"}>
                <img alt="" className={"task-item__checkmark"} src={Checkmark}/>
            </button>
        </div>
    )
}