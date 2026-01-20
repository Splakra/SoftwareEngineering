import './setReminderWeekdays.css'
import {useGlobal} from "../globalContext";

export default function SetReminderWeekdays() {

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const {therapyWeekday, setTherapyWeekday, therapyTime, setTherapyTime} = useGlobal();

    function updateWeekday(value, index) {
        const updated = [...therapyWeekday];
        updated[index] = value;
        setTherapyWeekday(updated)
    }

    return (
        <div>
            <h3>Bestimmte Tage wählen</h3>
            <div>
                {weekdays.map((day, index) => (
                    <label key={day} className="weekdays">
                        <input
                            type="checkbox"
                            checked={therapyWeekday[index]}
                            onChange={e => updateWeekday(e.target.checked, index)}
                        />
                        <span className="weekdays_span">{day}</span>
                    </label>
                ))}
            </div>

            <h3>Uhrzeit hinzufügen</h3>
            <input
                type="time"
                value={therapyTime}
                onChange={e => setTherapyTime(e.target.value)}
            />
        </div>
    );
}