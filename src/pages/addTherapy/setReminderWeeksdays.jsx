import './setReminderWeekdays.css'
import {useGlobal} from "../globalContext";

export default function SetReminderWeekdays() {

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const {weekday, setWeekday} = useGlobal();


    function updateWeekday(value, index) {
        const updated = [...weekday];
        updated[index] = value;
        setWeekday(updated);
    }

    return <div>
        <div>Bestimmte Tage wählen</div>
        <div>
            {
                weekdays.map(
                    (day, index) => {
                        return <label className="weekdays">
                            <input type="checkbox" checked={weekday[index]}
                                   onChange={e => updateWeekday(e.target.checked, index)}/>
                            <span className="weekdays_span">
                                {day}
                            </span>
                        </label>
                    }
                )
            }
        </div>
    </div>
}