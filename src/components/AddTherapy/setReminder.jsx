//back & quit auslagern für alle verfügbar
import './SetReminder.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import SetReminderInterval from "./SetReminderInterval";
import SetReminderWeekdays from "./SetReminderWeeksdays";
import SetReminderDaily from "./SetReminderDaily";


function SetReminder() {

    const [rhythm, setRhythm] = useState("")


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
            <button>
                Weiter
            </button>
        </div>
    );
}

export default SetReminder;

//Jeden Tag: Startdatum: Datumsauwahl // Enddatum: Datumsauswahl // Uhrzeit auswählen: Uhrzeit Auswahl
//Bestimmte Wochentage: Wochentage werden Displayed, auswahl (färbt sich wenn angetippt), Uhrzeit
//Intervall: Rythmus wählen: Alle ____ Dropdown(Minuten, Stunden, Tage, Wochen [Stunden als StandardAngabe])