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
        therapyTime,
        therapyWeekday,
        therapyIntervalType,
        therapyIntervalValue,
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
                return "";
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
            time: therapyTime,
            dose: therapyDose,
            weekdays: therapyWeekday,
            intervalType: therapyIntervalType,
            intervalValue: therapyIntervalValue
        })
        resetTherapy();
        navigate("/")
    }

    return (
        <div className={"page"}>
            <PageHeader title="Einnahme hinzufügen"/>

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
                        {therapyTime.map((value, index) => (
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
                    </div>
                )}

                {therapyRhythm === "interval" && (
                    <div>
                        Intervall: alle {therapyIntervalValue} {getIntervalUnit(therapyIntervalType)}
                    </div>
                )}
            </div>

            <button
                className={"control button button-next"}
                onClick={nextPage}>
                Einnahme speichern und beenden
            </button>
        </div>
    );
}

export default Review;