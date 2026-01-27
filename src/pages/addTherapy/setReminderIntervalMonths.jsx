import './setReminderIntervalMonths.css';
import {useGlobal} from "../globalContext";

export default function SetReminderIntervalMonths() {
    const {
        therapyStartDate,
    } = useGlobal();

    let day = new Date(therapyStartDate).getDate();

    return (
        <div className="warning set-reminder-interval__months">
            {`In Monaten mit weniger als ${day} Tagen wird der Reminder auf den letzten Tag des Monats gelegt.`}
        </div>
    )
}



