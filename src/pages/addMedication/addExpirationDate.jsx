import './addExpirationDate.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../globalContext";

function AddExpirationDate() {
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

    const isSkipping = !medicationExpDate && !(medicationExpiresValue && medicationExpiresType);

    function nextPage() {
        navigate("/addMedication/review", {viewTransition: true})
    }

    return (
        <div className="expiration page">
            <PageHeader title={medicationId ? "Medikament bearbeiten" : "Medikament hinzufügen"}
                quitPath={"/medication"} />

            <div className="view-transition-form">
                {/* Optionales Ablaufdatum */}
                <div className="query-wrapper">
                    <h2 className={"title"}>
                        Wann läuft das Medikament ab?
                        <span className="optional optional--title">(optional)</span>
                    </h2>
                    <div className="expiration__date">
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
                        <div className="input-wrapper">
                            <input
                                className="control input"
                                id="reminderValue"
                                type="number"
                                inputMode="numeric" // opens numeric keypad on phone
                                min="0"
                                step="1"
                                placeholder="0"
                                value={medicationExpiresValue || ""}
                                onChange={e => setMedicationExpiresValue(e.target.value)}
                            />
                        </div>
                        <div className="select-wrapper">
                            <select
                                className="control select"
                                id="reminderType"
                                value={medicationExpiresType ?? ""}
                                onChange={e => {
                                    setMedicationExpiresType(e.target.value);
                                }}
                            >
                                <option value="days">Tage</option>
                                <option value="weeks">Wochen</option>
                                <option value="months">Monate</option>
                            </select>
                        </div>
                        <span>vorher</span>
                    </div>
                    {(medicationExpiresValue < 0) && (
                        <div className="warning warning--spaced">
                            Bitte gib eine gültige Menge ein.
                        </div>
                    )}
                </div>
            </div>

            <button
                className="control button button-next"
                disabled={medicationExpiresValue < 0}
                onClick={nextPage}
            >
                {isSkipping ? "Überspringen" : "Weiter"}
            </button>
        </div>
    );
}

export default AddExpirationDate;