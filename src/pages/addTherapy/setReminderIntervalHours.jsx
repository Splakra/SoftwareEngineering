import {useGlobal} from "../globalContext";

export default function SetReminderIntervalMonths() {
    const {
        therapyTime,
        setTherapyTime,
        therapyIntervalType,
        setTherapyIntervalType,
        therapyIntervalValue,
        setTherapyIntervalValue,
        therapyIntervalMonths,
        setTherapyIntervalMonths,
        therapyIntervalHoursStartTime,
        setTherapyIntervalHoursStartTime
    } = useGlobal();

    function updateTime(value, index) {
        const updated = [...therapyTime];
        updated[index] = value;
        setTherapyTime(updated);
    }

    return (
        <div className="set-reminder-interval__time">

                <div> Startzeit </div>
                <input
                    type="time"
                    className="control select time"
                    value={therapyIntervalHoursStartTime ?? ""}
                    onChange={e => updateTime(e.target.value)} //hilfe, wie speichere ich die uhrzeit?
                />
        </div>
    )
}
