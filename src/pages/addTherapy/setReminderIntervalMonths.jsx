import {useGlobal} from "../globalContext";

export default function SetReminderIntervalMonths() {
    const {
        therapyStartDate,
    } = useGlobal();

    let day = new Date(therapyStartDate).getDate();

    return (
        <div>

            <div className={"date-warning"}>
                {`In Monaten, die nicht ${day} Tage haben, wird der Reminder auf den letzten Tag des Monats gelegt.`}
            </div>
        </div>
    )
}



