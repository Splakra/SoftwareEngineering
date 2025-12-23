//back & quit auslagern für alle verfügbar
import './setReminder.css';
import NavigationButtons from "./navigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import SetReminderInterval from "./setReminderInterval";
import SetReminderWeekdays from "./setReminderWeeksdays";
import SetReminderDaily from "./setReminderDaily";
import {useNavigate} from "react-router";
import {useGlobal} from "./globalContext";


function SetReminder() {
    const navigate = useNavigate();
    const {rhythm, setRhythm, time, intervalValue, weekday, startDate, setStartDate, endDate, setEndDate} = useGlobal();


    async function nextPage() {
        navigate("/addTherapy/review");
    }

    function isButtonDisabled() {
        switch (rhythm) {
            case"daily":
                return !time.every(value => value);

            case"weekdays":
                return !weekday.some(value => value);

            case"interval":
                return !intervalValue;

        }
    }

    return (
        <div>
            <NavigationButtons title="Einnahme hinzufügen"/>
            <div className={"choose-dose_heading"}>
                Wann möchtest Du erinnert werden?
            </div>
            <div className={"choose-rhythm"}>
                <div>Rhythmus auswählen</div>
                <select value={rhythm} onChange={e => setRhythm(e.target.value)}>
                    <option value={"daily"}>
                        Jeden Tag
                    </option>
                    <option value={"weekdays"}>
                        Bestimmte Wochentage
                    </option>
                    <option value={"interval"}>
                        Intervall
                    </option>
                </select>
                <div>
                    <div>Startdatum</div>
                    <input type="date" value={startDate}
                           onChange={e => setStartDate(e.target.value)}/> {/*pop up lässt sich möglicherweise nicht sytlen*/}
                </div>
                <div>
                    <div>Enddatum</div>
                    <input type="date" value={endDate}
                           onChange={e => setEndDate(e.target.value)}/> {/*pop up lässt sich möglicherweise nicht sytlen*/}
                </div>
                <div>{(() => {
                    switch (rhythm) {
                        case"daily":
                            return <SetReminderDaily/>

                        case"weekdays":
                            return <SetReminderWeekdays/>

                        case"interval":
                            return <SetReminderInterval/>
                    }
                })()
                } </div>
            </div>
            <button onClick={nextPage} disabled={isButtonDisabled()}>
                Weiter
            </button>
        </div>
    );
}

export default SetReminder;

//Jeden Tag: Startdatum: Datumsauwahl // Enddatum: Datumsauswahl // Uhrzeit auswählen: Uhrzeit Auswahl
//Bestimmte Wochentage: Wochentage werden Displayed, auswahl (färbt sich wenn angetippt), Uhrzeit
//Intervall: Rythmus wählen: Alle ____ Dropdown(Minuten, Stunden, Tage, Wochen [Stunden als StandardAngabe])