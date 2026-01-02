import './addName.css';
import NavigationButtons from "../../components/NavigationButtons/navigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "../globalContext";


function addName() {
    const navigate = useNavigate();
    const {medicationName, setMedicationName} = useGlobal();


    async function nextPage() {
        navigate("/addMedication/type")
    }


    return (
        <div className="addName">
            <NavigationButtons title="Medikament hinzufügen" quitPath={"/medication"}/>
            <div className={"addName__content"}>
                Füge ein neues Medikament hinzu!
            </div>
            <div>
                <div>Name des Medikaments eingeben</div>
                <input type={"text"} value={medicationName} onChange={e => setMedicationName(e.target.value)}/>
            </div>
            <button onClick={nextPage} disabled={!medicationName}>
                Weiter
            </button>
        </div>
    );
}

export default addName;