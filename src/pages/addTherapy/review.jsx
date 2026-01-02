//back & quit auslagern für alle verfügbar
import './review.css';
import NavigationButtons from "../../components/NavigationButtons/navigationButtons";
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
        profile, medication, dose, rhythm, startDate, endDate, time, weekday, intervalType, intervalValue, resetTherapy
    } = useGlobal();


    async function nextPage() {

        await db.reminders.add({
            medicationId: JSON.parse(medication).id,
            profileId: JSON.parse(profile).id,
            rhythm: rhythm,
            startDate: startDate,
            endDate: endDate,
            time: time,
            dose: dose,
            weekdays: weekday,
            intervalType: intervalType,
            intervalValue: intervalValue
        })
        resetTherapy();
        navigate("/")
    }

    return (
        <div>
            <NavigationButtons title="Einnahme hinzufügen"/>
            <div className={"choose-dose_heading"}>
                Sind die eingaben korrekt?

            </div>
            <div>
                <div>Profil: {JSON.parse(profile).name}</div>
                <div>Medikament: {JSON.parse(medication).name}</div>
                <div>Dosis: {dose} {(() => {
                    switch (JSON.parse(medication).type) {
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
                <div>Startdatum: {formatDate(startDate)}</div>
                <div>Enddatum: {endDate ? formatDate(endDate) : "kein Enddatum festgelegt"}</div>
                <div>Rhytmus: {(() => {
                    switch (rhythm) {
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
                    switch (rhythm) {
                        case"daily":
                            return <div>Uhrzeit: {time.map(value => <div>{value} Uhr</div>)}</div>

                        case"weekdays":
                            return <div>Wochentage: {weekday.map((day, index) =>
                                <div>{day ? displayedWeekdays[index] : null}</div>)}</div>

                        case"interval":
                            return <div>Intervall: alle {intervalValue}{(() => {
                                switch (intervalType) {
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