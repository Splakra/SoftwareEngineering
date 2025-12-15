//back & quit auslagern für alle verfügbar
import './ChooseDose.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";


function ChooseDose() {

    return (
        <div>
            <NavigationButtons title="Einnahme hinzufügen"/>
            <div className={"choose-dose_heading"}>
                In welcher Dosis soll das Medikament verabreicht werden?
            </div>
            <!-- eingabefeld für Zahlen -->
            <!-- dahinter dann Einheit, nach typ des medikaments (in db)
             pills: nur Zahl
             drops: nur Zahl
             fluid: ml
             other: nur Zahl

             -->
            <button>
                Weiter
            </button>
        </div>
    );
}

export default ChooseDose;