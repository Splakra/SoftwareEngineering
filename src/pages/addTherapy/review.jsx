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

    const displayedWeekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
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
        <div className={"review page"}>
            <PageHeader title="Einnahme hinzufügen"/>

            <div className="query-wrapper">
                <h2 className="title">
                    Stimmt alles?
                </h2>

                <div className="review__table">
                    <div className="review__row">
                        <span className="review__label">Profil</span>
                        <span className="review__value">{parsedProfile?.name}</span>
                    </div>
                    <div className="review__row">
                        <span className="review__label">Medikament</span>
                        <span className="review__value">{parsedMedication?.name}</span>
                    </div>
                    <div className="review__row">
                        <span className="review__label">Dosis</span>
                        <span className="review__value">{therapyDose} {getDoseUnit(parsedMedication?.type)}</span>
                    </div>
                    <div className="review__row">
                        <span className="review__label">Startdatum</span>
                        <span className="review__value">{formatDate(therapyStartDate)}</span>
                    </div>
                    <div className="review__row">
                        <span className="review__label">Enddatum</span>
                        <span
                            className="review__value">{therapyEndDate ? formatDate(therapyEndDate) : "kein Enddatum"}</span>
                    </div>
                    <div className="review__row">
                        <span className="review__label">Rhythmus</span>
                        <span className="review__value">{rhythmLabel}</span>
                    </div>

                    {therapyRhythm === "daily" && (
                        <div className="review__row">
                            <span className="review__label">Uhrzeit</span>
                            <span className="review__value">{therapyDailyTime.filter(t => t).join(", ")} Uhr</span>
                        </div>
                    )}

                    {therapyRhythm === "weekdays" && (
                        <>
                            <div className="review__row">
                                <span className="review__label">Wochentage</span>
                                <span className="review__value">
                                {therapyWeekday.map((day, index) => day ? displayedWeekdays[index] : null).filter(Boolean).join(", ")}
                            </span>
                            </div>
                            {therapyWeekdayTime && (
                                <div className="review__row">
                                    <span className="review__label">Uhrzeit</span>
                                    <span className="review__value">{therapyWeekdayTime} Uhr</span>
                                </div>
                            )}
                        </>
                    )}

                    {therapyRhythm === "interval" && (
                        <div className="review__row">
                            <span className="review__label">Intervall</span>
                            <span className="review__value">
                            alle {therapyIntervalValue} {getIntervalUnit(therapyIntervalType)}
                                {therapyIntervalHoursStartTime ? `, ${therapyIntervalHoursStartTime} Uhr` : ""}
                        </span>
                        </div>
                    )}
                </div>
            </div>

            <button
                className={"control button button-next"}
                onClick={nextPage}>
                Speichern
            </button>
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