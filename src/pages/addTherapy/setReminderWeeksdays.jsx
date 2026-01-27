import './setReminderWeekdays.css'
import {useGlobal} from "../globalContext";

export default function SetReminderWeekdays() {

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const {therapyWeekday, setTherapyWeekday, therapyWeekdayTime, setTherapyWeekdayTime} = useGlobal();

    function updateWeekday(value, index) {
        const updated = [...therapyWeekday];
        updated[index] = value;
        setTherapyWeekday(updated)
    }

    return (
        <div className="set-reminder-weekdays">
            <fieldset className="set-reminder-weekdays__days">
                <legend className="set-reminder__title set-reminder-weekdays__title">
                    Wochentage wählen
                </legend>

                {weekdays.map((day, index) => (
                    <label className="weekdays" key={day}>
                        <input
                            type="checkbox"
                            checked={Boolean(therapyWeekday[index])}
                            aria-label={`Wochentag ${day}`}
                            onChange={e => updateWeekday(e.target.checked, index)}
                        />
                        <span className="weekdays_span">{day}</span>
                    </label>
                ))}
            </fieldset>

            <label className="set-reminder-weekdays__time-wrapper">
                <span className="set-reminder__title ">
                    Uhrzeit
                </span>
                <input
                    className="date set-reminder-weekdays__time"
                    type="time"
                    value={therapyWeekdayTime ?? ""}
                    aria-label="Uhrzeit"
                    onChange={e => setTherapyWeekdayTime(e.target.value)}
                />
            </label>
        </div>
    );
}