import './setReminderWeekdays.css'
import {useGlobal} from "../globalContext";

export default function SetReminderWeekdays() {

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const {therapyWeekday, setTherapyWeekday, therapyTime, setTherapyTime} = useGlobal();


    function updateWeekday(value, index) {
        const updated = [...therapyWeekday];
        updated[index] = value;
        setTherapyWeekday(updated);
    }


    return <div>
        <div>Bestimmte Tage wählen</div>
        <div>
            {
                weekdays.map(
                    (day, index) => {
                        return <label className="weekdays">
                            <input type="checkbox" checked={therapyWeekday[index]}
                                   onChange={e => updateWeekday(e.target.checked, index)}/>
                            <span className="weekdays_span">
                                {day}
                            </span>
                        </label>
                    }
                )
            }
        </div>
        <div>Uhrzeit hinzufügen</div>
        <input type="time" value={therapyTime} onChange={e => setTherapyTime(e.target.value, index)}/>
    </div>
}