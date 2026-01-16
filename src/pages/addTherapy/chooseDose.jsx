import './chooseDose.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
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
                return "";
        }
    }

    return (
        <div className="page">
            <PageHeader title="einnahme hinzufügen"/>

            <h2 className="title">
                In welcher Dosis soll das Medikament verabreicht werden?
            </h2>

            <div className="choose-dose__input-wrapper">
                <label className="choose-dose__label" htmlFor="doseInput">
                    Gewünschte Dosis eingeben
                </label>

                <div className="choose-dose__input-line">
                    <input
                        className="control choose-dose__input"
                        id="doseInput"
                        type="number"
                        inputMode="numeric" // opens numeric keypad on phone
                        min="0"
                        step="any"
                        placeholder="666"
                        value={therapyDose ?? ""}
                        onChange={e => setTherapyDose(e.target.value)}
                    />
                    <span
                        className="choose-dose__unit">
                        {getDoseUnit()}
                    </span>
                </div>
            </div>

            <button
                className="control button button-next"
                disabled={therapyDose == null || therapyDose === ""}
                onClick={nextPage}
            >
                Weiter
            </button>
        </div>
    );
}

export default ChooseDose;