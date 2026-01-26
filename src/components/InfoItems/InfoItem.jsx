import './InfoItem.css';
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import PlusIconWhite from "../../assets/plus-icon-white.svg";
import PencilIcon from "../../assets/pencil.svg";
import TrashIcon from "../../assets/trash.svg";
import PawIcon from "../../assets/paw.svg";
import db from "../../database/DexieDatabase";
import {formatDate} from "../../pages/dateFormat";

export default function InfoItem({
                                     id,
                                     medication,
                                     patient,
                                     rhythm,
                                     startDate,
                                     endDate,
                                     dailyTime,
                                     dose,
                                     weekdays,
                                     weekdayTime,
                                     intervalType,
                                     intervalValue,
                                     intervalValueMonths,
                                     intervalStartTime
                                 }) {


    const doseText = `${dose} ${medication.type === "fluid" ? "ml" : medication.type === "drops" ? "ml" : medication.type === "pills" ? "Tabletten" : ""} `;
    const displayedWeekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

    function getIntervalUnit(type) {
        switch (type) {
            case "hours":
                return "Stunden";
            case "days":
                return "Tage";
            case "weeks":
                return "Wochen";
            case "months":
                return "Monate";
            default:
                return "";
        }
    }

    const deleteReminders = async () => {
        await db.reminders.where("id").equals(id).delete();
        window.location.reload(); // better with state-update?
    };

    const items = [
        {
            label: "Alle zugehörigen Einnahmen löschen",
            icon: TrashIcon,
            onClick: () => deleteReminders()
        }
    ]
    return (
        <div className={"info-item"}>
            <div className={"info-item__time"}>
                {
                    dailyTime.map((time, index) => <div key={index}>{time}</div>)
                }
                {
                    weekdayTime
                }
            </div>
            <div className={"info-item__infos"}>
                <ToggleMenu className="info-item-toggle"
                            {...{items}}/>
                <div className={"info-item__name"}>
                    <img alt="" className={"info-item__icon"} src={PawIcon}/>
                    {patient.name}
                </div>
                <div className={"info-item__medication"}>
                    {medication.name}
                </div>
                <div className={"info-item__details"}>
                    <div className={"info-item__dose"}>
                        {doseText}
                    </div>
                    {rhythm === "interval" && <div>alle {intervalValue} {getIntervalUnit(intervalType)}</div>}
                    {rhythm === "weekdays" && (
                        <div className={"info-item__details--weekdays"}>
                            Wochentage: {" "}
                            {weekdays.map((day, index) =>
                                day ? displayedWeekdays[index] : null
                            ).filter(v => v).join(", ")}
                        </div>
                    )}
                    <div className={"info-item__startDate"}>
                        Startdatum: {formatDate(startDate)}
                    </div>
                    <div className={"info-item__endDate"}>
                        Enddatum: {endDate ? formatDate(endDate) : "Kein Enddatum angegeben"}
                    </div>
                </div>

            </div>
            <div className={"medicine-item__details"}>

            </div>
        </div>
    )
}
