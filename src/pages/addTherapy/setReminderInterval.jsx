import {useGlobal} from "./globalContext";

export default function SetReminderInterval() {
    const {intervalType, setIntervalType} = useGlobal();
    const {intervalValue, setIntervalValue} = useGlobal();

    return <div>
        <div>
            Alle
        </div>
        <input type="number" value={intervalValue} onChange={e => setIntervalValue(e.target.value)}/>
        <select value={intervalType} onChange={e => setIntervalType(e.target.value)}>
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