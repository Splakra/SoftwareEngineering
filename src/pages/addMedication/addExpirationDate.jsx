import './addName.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "../globalContext";


function addExpirationDate() {
    const navigate = useNavigate();
    const {
        medicationExpDate,
        setMedicationExpDate,
        medicationExpiresValue,
        setMedicationExpiresValue,
        medicationExpiresType,
        setMedicationExpiresType,
        medicationId
    } = useGlobal();

    async function nextPage() {
        navigate("/addMedication/review")
    }


    return (
        <div className="addExpirationDate">
            <PageHeader title={medicationId ? "Medikament bearbeiten" : "Medikament hinzufügen"}
                        quitPath={"/medication"}/>
            <div className={"addExpirationDate__content"}>
                Wann läuft das Medikament ab? (optional)
            </div>
            <div>
                <div>Ablaufdatum</div>
                <input type="date" value={medicationExpDate} onChange={e => setMedicationExpDate(e.target.value)}/>
            </div>
            <div className={"addExpirationDate__content"}>
                Möchten Sie rechtzeitig vor dem Ablaufen erinnert werden? (optional)
            </div>
            <div>
                <div>Erinnerung ab</div>
                <input type="number" value={medicationExpiresValue}
                       onChange={e => setMedicationExpiresValue(e.target.value)}/>
                <select value={medicationExpiresType} onChange={e => setMedicationExpiresType(e.target.value)}>
                    <option selected></option>
                    <option value={"days"}>
                        Tage
                    </option>
                    <option value={"weeks"}>
                        Wochen
                    </option>
                    <option value={"months"}>
                        Monate
                    </option>
                </select>vorher
            </div>
            <button onClick={nextPage}>
                Weiter
            </button>
        </div>
    );
}

export default addExpirationDate;