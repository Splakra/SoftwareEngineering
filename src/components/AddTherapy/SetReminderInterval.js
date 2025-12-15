export default function SetReminderInterval() {
    return <div>
        <div>
            Alle
        </div>
        <input type="number"/>
        <select>
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