import {useGlobal} from "../globalContext";

export default function SetReminderInterval() {
    const {therapyIntervalType, setTherapyIntervalType} = useGlobal();
    const {therapyIntervalValue, setTherapyIntervalValue} = useGlobal();

    return <div>
        <div>
            Alle
        </div>
        <input type="number" value={therapyIntervalValue} onChange={e => setTherapyIntervalValue(e.target.value)}/>
        <select value={therapyIntervalType} onChange={e => setTherapyIntervalType(e.target.value)}>
            <option value={"hours"}>
                Stunden
            </option>
            <option value={"days"}>
                Tage
            </option>
            <option value={"weeks"}>
                Wochen
            </option>
            <option value={"months"}>
                Monate
            </option>

        </select>

    </div>
}