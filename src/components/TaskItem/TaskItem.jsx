import {useEffect, useState} from "react";
import PawIcon from "../../components/Icons/PawIcon.jsx";
import Checkmark from "../../assets/checkmark.svg";
import TrashIcon from "../../assets/trash.svg";
import ReverseIcon from "../../assets/reverse.svg";
import "./TaskItem.css";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import db from "../../database/DexieDatabase";
import {getDoseUnit, convertDoseToAmount} from "../../utils/therapyFormat";

export default function TaskItem({patient, medication, time, date, dose, id, done}) {
    const doseText = `${dose} ${getDoseUnit(medication.type)}`;
    const isDone = done.find((done) => done.date === date && done.time === time);
    const [checkedTime, setCheckedTime] = useState(isDone?.intakeTime || null);
    const [checked, setChecked] = useState(null);

    useEffect(() => {
        if (isDone) {
            setChecked(true);
            setCheckedTime(isDone.intakeTime);
        }
    }, [isDone]);
    

    // check off and reduce inventory
    const handleChecked = async () => {
        if (checked) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit"});

        const doseTaken = Number(convertDoseToAmount(dose, medication.type));
        const updatedMedication = await db.medications.get(medication.id);

        // save as "done"
        await db.done.add({
            reminderId: id,
            date,
            intakeTime: timeString,
            time,
            doseTaken
        });

        // reduce medication inventory
        const newAmount = Number.parseFloat((Number(updatedMedication.amount) - doseTaken).toFixed(2))
        await db.medications.update(medication.id, {amount: newAmount});

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
            await db.done
                .where("reminderId")
                .equals(id)
                .and((done) => done.date === date)
                .and((done) => done.time === time)
                .delete();
        }

        setChecked(false);
        setCheckedTime(null);
    };

    const deleteReminders = async () => {
        await db.reminders.where("id").equals(id).delete();
        window.location.reload(); // state-update?
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
                {time}
            </div>
            <div onClick={handleChecked} className={"task-item__button"}>
                <ToggleMenu className="task-item-toggle"
                            {...{items}} />
                <div className={"task-item__infos"}>
                    <div className={"task-item__profile"}>
                        <PawIcon className="task-item__icon"/>
                        <div className={"task-item__profile-name with-ellipsis"}>
                            {patient.name}
                        </div>
                    </div>
                    <div className={"task-item__medication"}>
                        {medication.name}
                    </div>
                    <div className={"task-item__details"}>
                        {doseText}
                        <div className={"task-item__status"}>
                            {status}
                        </div>
                    </div>
                </div>
                <div className="task-item__checkmark-wrapper">
                    <img alt="" className="task-item__checkmark" src={Checkmark}/>
                </div>
            </div>
        </div>
    )
}