import './setReminderInterval.css';
import {useGlobal} from "../globalContext";
import SetReminderDaily from "./setReminderDaily";
import SetReminderWeekdays from "./setReminderWeeksdays";
import SetReminderIntervalMonths from "./setReminderIntervalMonths";
import SetReminderIntervalHours from "./setReminderIntervalHours";

export default function SetReminderInterval() {
    const {
        therapyIntervalType,
        setTherapyIntervalType,
        therapyIntervalValue,
        setTherapyIntervalValue,
        therapyStartDate
    } = useGlobal();

    const renderType = () => {
        const day = new Date(therapyStartDate).getDate();
        return (therapyIntervalType === "months" && day >= 29)
            ? <SetReminderIntervalMonths/>
            : (therapyIntervalType === "hours")
                ? <SetReminderIntervalHours/>
                : null;
    };

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
                <div className="set-reminder-interval-months__details">
                    {renderType()}
                </div>
            </label>
        </div>
    );
}