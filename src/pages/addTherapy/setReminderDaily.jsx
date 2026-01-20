import {useState} from "react";
import {useGlobal} from "../globalContext";

export default function SetReminderDaily() {
    const {
        therapyDailyTime,
        setTherapyDailyTime,
    } = useGlobal();

    function addTime() {
        setTherapyDailyTime([...therapyDailyTime, ""]); // start value "" instead of null
    }

    function removeTime(index) {
        if (therapyDailyTime.length === 1) return; // last time must not be deleted
        setTherapyDailyTime(therapyDailyTime.toSpliced(index, 1));
    }

    function updateTime(value, index) {
        const updated = [...therapyDailyTime];
        updated[index] = value;
        setTherapyDailyTime(updated);
    }

    return <div>

        <div>
            <div>Uhrzeit hinzufügen</div>
            {
                therapyDailyTime.map((t, index) => {
                    return (
                        <div key={index}>
                            <input type="time"
                                   value={t ?? ""}
                                   onChange={e => updateTime(e.target.value, index)}/>
                            <button
                                onClick={() => removeTime(index)}
                                disabled={therapyDailyTime.length === 1}>
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