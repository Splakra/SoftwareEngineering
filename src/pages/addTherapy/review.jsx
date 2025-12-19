//back & quit auslagern für alle verfügbar
import './Review.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "./GlobalContext";


function Review() {
    const navigate = useNavigate();
    const {profile, medication, dose} = useGlobal();

    async function nextPage() {
        navigate("/")
    }

    return (
        <div>
            <NavigationButtons title="Einnahme hinzufügen"/>
            <div className={"choose-dose_heading"}>
                Sind die eingaben korrekt?

            </div>
            <div>
                {profile} - {medication} - {dose}
            </div>
            <button onClick={nextPage}>
                Speichern & Eingabe beenden
            </button>
        </div>
    );
}

export default Review;