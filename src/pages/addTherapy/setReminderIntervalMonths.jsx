import {useGlobal} from "../globalContext";

export default function SetReminderIntervalMonths() {
    const {
        therapyStartDate,
    } = useGlobal();

    let day = new Date(therapyStartDate).getDate();

    return (
        <div>

            <div className={"warning"}>
                {`In Monaten mit weniger als ${day} Tagen wird der Reminder auf den letzten Tag des Monats gelegt.`}
            </div>
        </div>
    )
}



