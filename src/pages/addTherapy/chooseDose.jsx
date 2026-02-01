import './chooseDose.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useGlobal} from "../globalContext";


function ChooseDose() {
    const navigate = useNavigate();
    const {therapyMedication, therapyDose, setTherapyDose} = useGlobal();

    function nextPage() {
        navigate("/addTherapy/reminder")
    }

    function getDoseUnit() {
        if (!therapyMedication) return "";

        switch (JSON.parse(therapyMedication).type) {
            case "pills":
                return "Tabletten";
            case "fluid":
                return "ml";
            case "drops":
                return "Tropfen";
            default:
                return "Sonstige";
        }
    }

    return (
        <div className="choose-dose page">
            <PageHeader title="einnahme hinzufügen"/>

            <div className="query-wrapper">
                <h2 className="title">
                    Wie hoch ist die Dosis?
                </h2>

                <label htmlFor="doseInput">
                    Gewünschte Dosis eingeben
                </label>

                <div className="input-wrapper">
                    <div className="input-line">
                        <input
                            className="control input"
                            id="doseInput"
                            type="number"
                            inputMode="numeric" // opens numeric keypad on phone
                            min="0"
                            step="any"
                            placeholder="42"
                            value={therapyDose ?? ""}
                            onChange={e => setTherapyDose(e.target.value)}
                        />
                        <span
                            className="unit">
                                {getDoseUnit()}
                            </span>
                    </div>
                </div>
                {(therapyDose < 0) && (
                    <div className="warning warning--spaced">
                        Bitte gib eine gültige Menge ein.
                    </div>
                )}
            </div>

            <button
                className="control button button-next"
                disabled={therapyDose === "" || therapyDose < 0}
                onClick={nextPage}
            >
                Weiter
            </button>
        </div>
    );
}

export default ChooseDose;