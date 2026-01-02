import './addName.css';
import NavigationButtons from "../../components/NavigationButtons/NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "../globalContext";


function addType() {
    const navigate = useNavigate();
    const {medicationType, setMedicationType} = useGlobal();


    async function nextPage() {
        navigate("/addMedication/stock")
    }


    return (
        <div className="addType">
            <NavigationButtons title="Medikament hinzufügen" quitPath={"/medication"}/>
            <div className={"addType__content"}>
                Wie wird dieses Medikament verabreicht?
            </div>
            <div>

                <div>Einheit auswählen</div>
                <select value={medicationType} onChange={e => setMedicationType(e.target.value)}>
                    <option selected></option>
                    <option value={"pills"}>
                        Tabletten
                    </option>
                    <option value={"fluid"}>
                        Flüssig (ml)
                    </option>
                    <option value={"drops"}>
                        Tropfen
                    </option>
                    <option value={"other"}>
                        Sonstige
                    </option>
                </select>
            </div>
            <button onClick={nextPage} disabled={!medicationType}>
                Weiter
            </button>
        </div>
    );
}

export default addType;