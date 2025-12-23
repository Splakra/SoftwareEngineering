import {useState} from "react";
import {useGlobal} from "./globalContext";

export default function SetReminderDaily() {
    const {time, setTime, startDate, setStartDate, endDate, setEndDate,} = useGlobal();

    function addTime() {
        setTime([...time, null]);
    }

    function removeTime(index) {
        setTime(time.toSpliced(index, 1));
    }

    function updateTime(value, index) {
        const updated = [...time];
        updated[index] = value;
        setTime(updated);
    }

    return <div>

        <div>
            <div>Uhrzeit hinzufügen</div>
            {
                time.map((t, index) => {
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