import {useState} from "react";
import {useGlobal} from "../globalContext";

export default function SetReminderDaily() {
    const {
        therapyTime,
        setTherapyTime,
        therapyStartDate,
        setTherapyStartDate,
        therapyEndDate,
        setTherapyEndDate,
    } = useGlobal();

    function addTime() {
        setTherapyTime([...therapyTime, ""]); // start value "" instead of null
    }

    function removeTime(index) {
        if (time.length === 1) return; // last time must not be deleted
        setTherapyTime(therapyTime.toSpliced(index, 1));
    }

    function updateTime(value, index) {
        const updated = [...therapyTime];
        updated[index] = value;
        setTherapyTime(updated);
    }

    return <div>

        <div>
            <div>Uhrzeit hinzufügen</div>
            {
                therapyTime.map((t, index) => {
                    return (
                        <div key={index}>
                            <input type="time"
                                   value={t ?? ""}
                                   onChange={e => updateTime(e.target.value, index)}/>
                            <button
                                onClick={() => removeTime(index)}
                                disabled={therapyTime.length === 1}>
                                X
                            </button>
                        </div>
                    )
                })
            }
            <button onClick={addTime}>
                Hinzufügen
            </button>
        </div>
    </div>
}