import './setReminderIntervalHours.css';
import {useGlobal} from "../globalContext";

export default function SetReminderIntervalMonths() {
    const {
        therapyIntervalHoursStartTime,
        setTherapyIntervalHoursStartTime
    } = useGlobal();


    return (
        <div className="set-reminder-interval__horus">

            <div className="set-reminder-interval__time--wrapper">
                <label>
                    Startzeit
                </label>

                <input
                    type="time"
                    className="date"
                    value={therapyIntervalHoursStartTime ?? ""}
                    onChange={e => setTherapyIntervalHoursStartTime(e.target.value)}
                />
            </div>
        </div>
    )
}
