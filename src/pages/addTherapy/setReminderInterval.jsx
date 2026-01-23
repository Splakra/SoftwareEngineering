import './setReminderInterval.css';
import {useGlobal} from "../globalContext";

export default function SetReminderInterval() {
    const {
        therapyIntervalType,
        setTherapyIntervalType,
        therapyIntervalValue,
        setTherapyIntervalValue
    } = useGlobal();

    return (
        <div className="set-reminder-interval">
            <label className="set-reminder-interval__wrapper">
                <span className="set-reminder__title set-reminder-interval__title">Alle</span>
                <input
                    className="set-reminder-interval__input"
                    type="number"
                    inputMode="numeric" // opens numeric keypad on phone
                    min="1"
                    step="any"
                    placeholder="7"
                    value={therapyIntervalValue ?? ""}
                    onChange={e => setTherapyIntervalValue(e.target.value)}
                />
                <select
                    className="set-reminder-interval__rhythm"
                    value={therapyIntervalType}
                    onChange={e => setTherapyIntervalType(e.target.value)}
                >
                    <option value="hours">Stunden</option>
                    <option value="days">Tage</option>
                    <option value="weeks">Wochen</option>
                    <option value="months">Monate</option>
                </select>
            </label>
        </div>
    );
}