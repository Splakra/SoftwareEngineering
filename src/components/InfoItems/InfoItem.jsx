import './InfoItem.css';
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import PlusIconWhite from "../../assets/plus-icon-white.svg";
import PencilIcon from "../../assets/pencil.svg";
import TrashIcon from "../../assets/trash.svg";
import db from "../../database/DexieDatabase";
import {
    getDoseUnit,
    formatWeekdays,
    formatInterval,
    formatTimes,
    formatDate
} from "../../utils/therapyFormat";

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

    const doseText = `${dose} ${getDoseUnit(medication?.type)}`;

    const deleteReminders = async () => {
        await db.reminders.where("id").equals(id).delete();
        window.location.reload(); // state-update?
    };

    const menuItems = [
        {
            label: "Alle zugehörigen Einnahmen löschen",
            icon: TrashIcon,
            onClick: () => deleteReminders()
        }
    ]

    return (
        <div className="info-item">
            <div className="info-item__infos">
                <ToggleMenu className="info-item__toggle" items={menuItems}/>

                <div className="info-item__title with-ellipsis">
                    {medication?.name}
                </div>

                <dl className="info-item__table">
                    <dt>Dosis</dt>
                    <dd>{doseText}</dd>

                    <dt>Startdatum</dt>
                    <dd>{formatDate(startDate)}</dd>

                    <dt>Enddatum</dt>
                    <dd>{endDate ? formatDate(endDate) : "Kein Enddatum"}</dd>

                    {rhythm === "daily" && (
                        <>
                            <dt>Uhrzeit</dt>
                            <dd>{formatTimes(dailyTime)}</dd>
                        </>
                    )}

                    {rhythm === "weekdays" && (
                        <>
                            <dt>Wochentage</dt>
                            <dd>{formatWeekdays(weekdays)}</dd>

                            {weekdayTime && (
                                <>
                                    <dt>Uhrzeit</dt>
                                    <dd>{`${weekdayTime} Uhr`}</dd>
                                </>
                            )}
                        </>
                    )}

                    {rhythm === "interval" && (
                        <>
                            <dt>Intervall</dt>
                            <dd>{formatInterval({intervalValue, intervalType, intervalStartTime})}</dd>
                        </>
                    )}
                </dl>
            </div>
        </div>
    );
}
