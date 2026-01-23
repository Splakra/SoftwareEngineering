import {useGlobal} from "../globalContext";

export default function SetReminderIntervalMonths() {
    const {
        therapyIntervalHoursStartTime,
        setTherapyIntervalHoursStartTime
    } = useGlobal();



    return (
        <div className="set-reminder-interval__time">

                <div> Startzeit </div>
                <input
                    type="time"
                    className="control select time"
                    value={therapyIntervalHoursStartTime ?? "00:00"}
                    onChange={e => setTherapyIntervalHoursStartTime(e.target.value)}
                />
        </div>
    )
}
