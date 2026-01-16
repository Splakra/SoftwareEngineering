import {useEffect, useState} from "react";
import PawIcon from "../../assets/paw.svg";
import Checkmark from "../../assets/checkmark.svg";
import TrashIcon from "../../assets/trash.svg";
import ReverseIcon from "../../assets/reverse.svg";
import "./TaskItem.css";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import db from "../../database/DexieDatabase";

export default function TaskItem({disableActions, patient, medication, time, showTime, dose, id}) {
    const [checked, setChecked] = useState(false);
    const [checkedTime, setCheckedTime] = useState(null);

    const doseText = `${dose} ${medication.type === "fluid" ? "ml" : medication.type === "drops" ? "ml" : medication.type === "pills" ? "Tabletten" : ""} `;

    // check whether already checked off
    useEffect(() => {
        (async () => {
            const entry = await db.done.where("reminderId").equals(id).first();
            if (entry) {
                setChecked(true);
                setCheckedTime(entry.time);
            }
        })();
    }, [id]);

    // convert drops to ml
    function convertDoseToAmount(dose, type) {
        if (type === "drops") return dose * 0.05; // 1 drop = 0.05ml
        return dose; // pills or ml remain as they are
    }

    // check off and reduce inventory
    const handleChecked = async () => {
        if (checked || disableActions) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit"});

        const doseTaken = Number(convertDoseToAmount(dose, medication.type));

        // save as "done"
        await db.done.add({
            reminderId: id,
            date: now.toISOString().split("T")[0],
            time: timeString,
            doseTaken
        });

        // reduce medication inventory
        await db.medications.update(medication.id, {amount: Number(medication.amount) - doseTaken});

        setChecked(true);
        setCheckedTime(timeString);
    };

    // reset check mark and update medication inventory
    const resetChecked = async () => {
        if (!checked) return;

        const entry = await db.done.where("reminderId").equals(id).first();
        if (entry) {
            const doseTaken = Number(entry.doseTaken);
            const currentAmountEntry = await db.medications.get(medication.id);

            await db.medications.update(medication.id, {
                amount: Number(currentAmountEntry.amount) + doseTaken
            });

            await db.done.delete(entry.id);
        }

        setChecked(false);
        setCheckedTime(null);
    };

    const deleteReminders = async () => {
        await db.reminders.delete(id);
        window.location.reload(); // better with state-update?
    };

    const status = checked ? `Eingenommen: ${checkedTime}` : "Ausstehend";

    const items = [
        {
            label: "Diese und alle zukünftigen Einnahmen löschen",
            icon: TrashIcon,
            onClick: () => deleteReminders()
        }
    ]
    if (checked) {
        items.unshift({
            label: "Abhaken zurücksetzen",
            icon: ReverseIcon,
            onClick: () => resetChecked()
        })
    }

    return (
        <div className={`task-item ${checked ? "task-item--checked" : ""}`}>
            <div className={"task-item__time"}>
                {showTime && time}
                {/* time will only be shown if showTime is true */}
            </div>
            <div onClick={handleChecked} className={"task-item__button"}>
                <ToggleMenu className="task-item-toggle"
                            {...{items}}/>
                <div className={"task-item__infos"}>
                    <div className={"task-item__profile"}>
                        <img alt="" className={"task-item__icon"} src={PawIcon}/>
                        {patient.name}
                    </div>
                    <div className={"task-item__medication"}>
                        {medication.name}
                    </div>
                    <div className={"task-item__details"}>
                        {doseText}
                        {!disableActions ?? <div className={"task-item__status"}>
                            {status}
                        </div>}
                    </div>
                </div>
                <div className="task-item__checkmark-wrapper">
                    <img alt="" className="task-item__checkmark" src={Checkmark}/>
                </div>
            </div>
        </div>
    )
}