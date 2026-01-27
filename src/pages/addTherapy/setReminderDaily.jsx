import './setReminderDaily.css';
import {useGlobal} from "../globalContext";
import TrashIcon from "../../assets/trash.svg"
import PlusIcon from "../../assets/plus-icon.svg"

export default function SetReminderDaily() {
    const {
        therapyDailyTime,
        setTherapyDailyTime,
    } = useGlobal();

    function addTime() {
        setTherapyDailyTime([...therapyDailyTime, ""]); // start value "" instead of null
    }

    function removeTime(index) {
        if (therapyDailyTime.length === 1) return; // last time must not be deleted
        setTherapyDailyTime(therapyDailyTime.toSpliced(index, 1));
    }

    function updateTime(value, index) {

        const updated = [...therapyDailyTime];
        updated[index] = value;
        setTherapyDailyTime(updated);
    }

    return (
        <div className="set-reminder-daily">
            <div className="set-reminder-daily__time-wrapper">
                <span className="set-reminder-daily__title">Uhrzeit</span>

                <div className="set-reminder-daily__time-list">
                    {therapyDailyTime.map((t, index) => (
                        <div className="set-reminder-daily__time-row" key={index}>
                            <div className="set-reminder-daily__time-input-wrapper">
                                <input
                                    type="time"
                                    className={"date set-reminder-daily__time"}
                                    value={t ?? ""}
                                    onChange={e => updateTime(e.target.value, index)}
                                    aria-label={`Uhrzeit ${index + 1}`}
                                />
                            </div>

                            <button
                                className="set-reminder-daily__remove"
                                onClick={() => removeTime(index)}
                                disabled={therapyDailyTime.length === 1}
                                aria-label="Uhrzeit löschen"
                            >
                                <img className="trash-icon" alt="" src={TrashIcon}/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="set-reminder-daily__add-container">
                <button
                    className="set-reminder-daily__add"
                    onClick={addTime}
                    aria-label="Weitere Uhrzeit hinzufügen"
                >
                    <img className="plus-icon" alt="" src={PlusIcon}/>
                    Uhrzeit hinzufügen
                </button>
            </div>
        </div>
    );
}