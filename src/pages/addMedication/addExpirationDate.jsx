import './addExpirationDate.css';
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

    function nextPage() {
        navigate("/addMedication/review")
    }

    return (
        <div className="expiration page">
            <PageHeader title={medicationId ? "Medikament bearbeiten" : "Medikament hinzufügen"}
                        quitPath={"/medication"}/>

            {/* Optionales Ablaufdatum */}
            <div className="query-wrapper">
                <h2 className={"title"}>
                    Wann läuft das Medikament ab?
                    <span className="optional optional--title">(optional)</span>
                </h2>
                <label htmlFor="expirationDate">
                    Ablaufdatum
                </label>
                <div className="date-wrapper">
                    <input
                        className="date"
                        type="date"
                        value={medicationExpDate ?? ""}
                        onChange={e => setMedicationExpDate(e.target.value)}/>
                </div>
            </div>

            {/* Optionale Erinnerung */}
            <div className="query-wrapper">
                <h3 className="title">
                    Vor dem Ablauf erinnern lassen?
                    <span className="optional optional--title">(optional)</span>
                </h3>
                <label htmlFor="reminderValue">
                    Erinnerung ab
                </label>
                <div className="expiration__reminder">
                    <input
                        id="reminderValue"
                        type="number"
                        min="0"
                        placeholder="7"
                        value={medicationExpiresValue || ""}
                        onChange={e => setMedicationExpiresValue(e.target.value)}
                    />

                    <select
                        id="reminderType"
                        value={medicationExpiresType || ""}
                        onChange={e => setMedicationExpiresType(e.target.value)}
                    >
                        <option value="">--</option>
                        <option value="days">Tage</option>
                        <option value="weeks">Wochen</option>
                        <option value="months">Monate</option>
                    </select>
                    vorher
                </div>
            </div>

            <button
                className="control button button-next"
                onClick={nextPage}
            >
                Weiter
            </button>
        </div>
    );
}

export default addExpirationDate;