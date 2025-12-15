//back & quit auslagern für alle verfügbar
import './SetReminder.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";


function SetReminder() {

    return (
        <div>
            <NavigationButtons title="Einnahme hinzufügen"/>
            <div className={"choose-dose_heading"}>
                Wann möchten Sie erinnert werden?
            </div>
            <!-- "Rythmus auswählen" -->
            <!-- Dropdown mit Optionen: Jeden Tag, bestimmte Wochentage, Intervall -->
            <!--
            Jeden Tag: Startdatum: Datumsauwahl // Enddatum: Datumsauswahl // Uhrzeit auswählen: Uhrzeit Auswahl
            Bestimmte Wochentage: Wochentage werden Displayed, auswahl (färbt sich wenn angetippt), Uhrzeit
            Intervall: Rythmus wählen: Alle ____ Dropdown(Minuten, Stunden, Tage, Wochen [Stunden als Standard Angabe])
             -->
            <button>
                Weiter
            </button>
        </div>
    );
}

export default SetReminder;