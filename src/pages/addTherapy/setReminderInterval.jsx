import {useGlobal} from "../globalContext";

export default function SetReminderInterval() {
    const {
        therapyIntervalType,
        setTherapyIntervalType,
        therapyIntervalValue,
        setTherapyIntervalValue
    } = useGlobal();

    return (
        <div>
            <span>Alle</span>

            <input
                type="number"
                min="1"
                value={therapyIntervalValue ?? ""}
                onChange={e => setTherapyIntervalValue(e.target.value)}
            />

            <select
                value={therapyIntervalType}
                onChange={e => setTherapyIntervalType(e.target.value)}
            >
                <option value="hours">Stunden</option>
                <option value="days">Tage</option>
                <option value="weeks">Wochen</option>
                <option value="months">Monate</option>
            </select>
        </div>
    );
}