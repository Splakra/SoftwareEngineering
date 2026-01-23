import './review.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "../globalContext";
import SetReminderDaily from "./setReminderDaily";
import SetReminderWeekdays from "./setReminderWeeksdays";
import SetReminderInterval from "./setReminderInterval";
import {formatDate} from "../dateFormat";

function Review() {
    const navigate = useNavigate();

    const displayedWeekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

    const {
        therapyProfile,
        therapyMedication,
        therapyDose,
        therapyRhythm,
        therapyStartDate,
        therapyEndDate,
        therapyDailyTime,
        therapyWeekday,
        therapyWeekdayTime,
        therapyIntervalType,
        therapyIntervalValue,
        therapyIntervalMonths,
        therapyIntervalHoursStartTime,
        resetTherapy
    } = useGlobal();

    const parsedProfile = therapyProfile ? JSON.parse(therapyProfile) : null;
    const parsedMedication = therapyMedication ? JSON.parse(therapyMedication) : null;

    const rhythmLabel = {
        daily: "Jeden Tag",
        weekdays: "Bestimmte Wochentage",
        interval: "Intervall"
    }[therapyRhythm];

    function getDoseUnit(type) {
        switch (type) {
            case "pills":
                return "Tabletten";
            case "fluid":
                return "ml";
            case "drops":
                return "Tropfen";
            default:
                return "Sonstige";
        }
    }

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

    async function nextPage() {
        await db.reminders.add({
            medicationId: JSON.parse(therapyMedication).id,
            profileId: JSON.parse(therapyProfile).id,
            rhythm: therapyRhythm,
            startDate: therapyStartDate,
            endDate: therapyEndDate,
            dailyTime: therapyDailyTime,
            dose: therapyDose,
            weekdays: therapyWeekday,
            weekdayTime: therapyWeekdayTime,
            intervalType: therapyIntervalType,
            intervalValue: therapyIntervalValue,
            intervalValueMonths: therapyIntervalMonths,
            intervalStartTime: therapyIntervalHoursStartTime
        })
        resetTherapy();
        navigate("/")
    }

    return (
        <div className={"page"}>
            <PageHeader title="Einnahme hinzufügen"/>

            <div className="query-wrapper">
                <h2 className="title">
                    Sind alle Eingaben korrekt?
                </h2>

                <div>
                    <div>Profil: {parsedProfile?.name}</div>
                    <div>Medikament: {parsedMedication?.name}</div>
                    <div>Dosis: {therapyDose} {getDoseUnit(parsedMedication?.type)}</div>

                    <div>Startdatum: {formatDate(therapyStartDate)}</div>
                    <div>
                        Enddatum: {therapyEndDate ? formatDate(therapyEndDate) : "kein Enddatum festgelegt"}
                    </div>

                    <div>Rhythmus: {rhythmLabel}</div>

                {therapyRhythm === "daily" && (
                    <div>
                        Uhrzeit:
                        {therapyDailyTime.map((value, index) => (
                            <div key={index}>{value} Uhr</div>
                        ))}
                    </div>
                )}

                {therapyRhythm === "weekdays" && (
                    <div>
                        Wochentage:
                        {therapyWeekday.map((day, index) =>
                            day ? <div key={index}>{displayedWeekdays[index]}</div> : null
                        )}
                        {therapyWeekdayTime ? <div>Uhrzeit: {therapyWeekdayTime} Uhr</div> : null}
                    </div>
                )}

                {therapyRhythm === "interval" && (
                    <div>
                        Intervall: alle {therapyIntervalValue} {getIntervalUnit(therapyIntervalType)}
                        {therapyIntervalHoursStartTime ? <div>Uhrzeit: {therapyIntervalHoursStartTime} Uhr</div> : null}

                    </div>
                )}
            </div>

            <button
                className={"control button button-next"}
                onClick={nextPage}>
                Einnahme speichern und beenden
            </button>
            </div>
        </div>
    );
}

export default Review;

//{therapyIntervalMonths === "lastDay" && (
//                     <div>
//                         Monatliche Erinnerung : Letzter Tag des Monats
//                     </div>
//                 )}
//
//                 {therapyIntervalMonths === "lastMonday" && (
//                     <div>
//                         Monatliche Erinnerung : Letzter Montag des Monats
//                     </div>
//                 )}
//
//                 {therapyIntervalMonths === "lastTuesday" && (
//                     <div>
//                         Monatliche Erinnerung : Letzter Dienstag des Monats
//                     </div>
//                 )}
//
//                 {therapyIntervalMonths === "lastWednesday" && (
//                     <div>
//                         Monatliche Erinnerung : Letzter Mittwoch des Monats
//                     </div>
//                 )}
//
//                 {therapyIntervalMonths === "lastThursday" && (
//                     <div>
//                         Monatliche Erinnerung : Letzter Donnerstag des Monats
//                     </div>
//                 )}
//
//                 {therapyIntervalMonths === "lastFriday" && (
//                     <div>
//                         Monatliche Erinnerung : Letzter Montag des Monats
//                     </div>
//                 )}
//
//                 {therapyIntervalMonths === "lastSaturday" && (
//                     <div>
//                         Monatliche Erinnerung : Letzter Freitag des Monats
//                     </div>
//                 )}
//
//                 {therapyIntervalMonths === "lastSunday" && (
//                     <div>
//                         Monatliche Erinnerung : Letzter Samstag des Monats
//                     </div>
//                 )}