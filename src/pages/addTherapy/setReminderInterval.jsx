import './setReminderInterval.css';
import {useGlobal} from "../globalContext";
import SetReminderIntervalMonths from "./setReminderIntervalMonths";
import SetReminderIntervalHours from "./setReminderIntervalHours";
import {useEffect} from "react";

export default function SetReminderInterval() {
    const {
        therapyIntervalType,
        setTherapyIntervalType,
        therapyIntervalValue,
        setTherapyIntervalValue,
        therapyStartDate,
        setTherapyIntervalHoursStartTime
    } = useGlobal();

    useEffect(() => {
        if (therapyIntervalType !== "hours") {
            setTherapyIntervalHoursStartTime(null);
        }
    }, [therapyIntervalType]);

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
            <div className="set-reminder-interval__type">
                <div className="set-reminder-interval__wrapper">
                    <span>Alle</span>

                    <input
                        className="control input set-reminder-interval__value"
                        type="number"
                        inputMode="numeric" // opens numeric keypad on phone
                        min="1"
                        step="any"
                        placeholder="0"
                        value={therapyIntervalValue ?? ""}
                        onChange={e => setTherapyIntervalValue(e.target.value)}
                    />

                    <div className="select-wrapper">
                        <select
                            className="control select set-reminder-interval__rhythm"
                            value={therapyIntervalType}
                            onChange={e => setTherapyIntervalType(e.target.value)}
                        >
                            <option value="hours">Stunden</option>
                            <option value="days">Tage</option>
                            <option value="weeks">Wochen</option>
                            <option value="months">Monate</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="set-reminder-interval__details">
                {renderType()}
            </div>
        </div>
    );
}