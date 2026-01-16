//back & quit auslagern für alle verfügbar
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
        <div>
            <PageHeader title="Einnahme hinzufügen"/>
            <div className={"choose-dose_heading"}>
                Sind die eingaben korrekt?

            </div>
            <div>
                <div>Profil: {JSON.parse(therapyProfile)?.name}</div>
                <div>Medikament: {JSON.parse(therapyMedication)?.name}</div>
                <div>Dosis: {therapyDose} {(() => {
                    switch (JSON.parse(therapyMedication)?.type) {
                        case"pills":
                            return "Tabletten"

                        case"fluid":
                            return "ml"

                        case"drops":
                            return "Tropfen"

                        default:
                            return ""
                    }
                })()
                } </div>
                <div>Startdatum: {formatDate(therapyStartDate)}</div>
                <div>Enddatum: {therapyEndDate ? formatDate(therapyEndDate) : "kein Enddatum festgelegt"}</div>
                <div>Rhytmus: {(() => {
                    switch (therapyRhythm) {
                        case"daily":
                            return <span>Jeden Tag</span>

                        case"weekdays":
                            return <span>Bestimmte Wochentage</span>

                        case"interval":
                            return <span>Intervall</span>
                    }
                })()
                } </div>

                <div>{(() => {
                    switch (therapyRhythm) {
                        case"daily":
                            return <div>Uhrzeit: {therapyTime.map(value => <div>{value} Uhr</div>)}</div>

                        case"weekdays":
                            return <div>Wochentage: {therapyWeekday.map((day, index) =>
                                <div>{day ? displayedWeekdays[index] : null}</div>)}</div>

                        case"interval":
                            return <div>Intervall: alle {therapyIntervalValue}{(() => {
                                switch (therapyIntervalType) {
                                    case"hours":
                                        return <span> Stunden</span>

                                    case"days":
                                        return <span> Tage</span>

                                    case"weeks":
                                        return <span> Wochen</span>

                                    case"months":
                                        return <span> Monate</span>
                                }
                            })()
                            }</div>
                    }
                })()
                } </div>


            </div>
            <button onClick={nextPage}>
                Speichern & Eingabe beenden
            </button>
        </div>
    );
}

export default Review;