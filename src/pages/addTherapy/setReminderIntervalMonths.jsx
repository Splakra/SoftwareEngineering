import {useGlobal} from "../globalContext";

export default function SetReminderIntervalMonths() {
    const {
        therapyIntervalMonths,
        setTherapyIntervalMonths,
    } = useGlobal();

    return (
        <div>
            <span>Alle</span>

            <select
                value={therapyIntervalMonths}
                onChange={e => setTherapyIntervalMonths(e.target.value)}>

                <option value="lastDay">letzter Tag des Monats</option>
                <option value="lastMonday">letzter Montag des Monats</option>
                <option value="lastTuesday">letzter Dienstag des Monats</option>
                <option value="lastWednesday">letzter Mittwoch des Monats</option>
                <option value="lastThursday">letzter Donnerstag des Monats</option>
                <option value="lastFriday">letzter Freitag des Monats</option>
                <option value="lastSaturday">letzter Samstag des Monats</option>
                <option value="lastSunday">letzter Sonntag des Monats</option>
            </select>
        </div>
    )
}
