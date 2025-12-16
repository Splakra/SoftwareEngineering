//back & quit auslagern für alle verfügbar
import './Review.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";


function Review() {

    return (
        <div>
            <NavigationButtons title="Einnahme hinzufügen"/>
            <div className={"choose-dose_heading"}>
                Sind die eingaben korrekt?
            </div>
            <!-- anzeigen aller Eingaben, zum überprüfen vor eigentlicher Speicherung? -->
            <button>
                Speichern & Eingabe beenden
            </button>
        </div>
    );
}

export default Review;