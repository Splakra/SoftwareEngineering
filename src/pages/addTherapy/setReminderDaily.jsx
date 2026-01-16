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
        setTherapyTime([...therapyTime, null]);
    }

    function removeTime(index) {
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
                        <div>
                            <input type="time" value={t} onChange={e => updateTime(e.target.value, index)}/>
                            <button onClick={() => removeTime(index)}>
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