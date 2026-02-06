import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useGlobal} from "../globalContext";
import {getDoseUnit, getMedicationUnit} from "../../utils/therapyFormat";

function AddStock() {
    const navigate = useNavigate();
    const {
        medicationStock,
        setMedicationStock,
        medicationBuyNew,
        setMedicationBuyNew,
        medicationType,
        medicationId
    } = useGlobal();

    function nextPage() {
        navigate("/addMedication/expirationDate", {viewTransition: true})
    }


    return (
        <div className="page">
            <PageHeader
                title={medicationId ? "Medikament bearbeiten" : "Medikament hinzufügen"}
                quitPath={"/medication"}
            />
            <div className="view-transition-form">
                <div className="query-wrapper">
                    <h2 className={"title"}>
                        Wie viel ist noch vorrätig?
                    </h2>

                    {/* Aktueller Vorrat */}
                    <label htmlFor="stockInput">
                        Aktueller Vorrat
                    </label>

                    <div className="input-wrapper">
                        <div className="input-line">
                            <input
                                className="control input"
                                id="stockInput"
                                type="number"
                                inputMode="numeric" // opens numeric keypad on phone
                                min="0"
                                step="0.01"
                                placeholder="1312"
                                value={medicationStock ?? ""}
                                onChange={e => setMedicationStock(e.target.value)}

                                onBlur={() => {
                                    setMedicationStock(prev => {
                                        if (prev === "" || isNaN(prev)) return "";
                                        return Number(prev).toFixed(2);
                                    });
                                }}/>
                            <span
                                className="unit">
                            {getMedicationUnit(medicationType)}
                        </span>
                        </div>
                    </div>
                    {medicationType === "drops" && (
                        <div className="notice">
                            <div className="notice__title">
                                Vorrat bitte in Millilitern angeben.
                            </div>
                            <div className="notice__meta">
                                1 Tropfen ≈ 0.05 ml
                            </div>
                        </div>
                    )}
                    {(medicationStock < 0) && (
                        <div className="warning warning--spaced">
                            Bitte gib eine gültige Menge ein.
                        </div>
                    )}
                </div>

                {/* Optionale Erinnerung */}
                <div className="query-wrapper">
                    <h3 className="title">
                        Erinnerung bei niedrigem Vorrat
                        <span className="optional optional--title">(optional)</span>
                    </h3>

                    <label htmlFor="buyNewInput">
                        Erinnerung ab
                    </label>

                    <div className="input-wrapper">
                        <div className="input-line">
                            <input
                                className="control input"
                                id="buyNewInput"
                                type="number"
                                inputMode="numeric" // opens numeric keypad on phone
                                min="0"
                                step="0.01"
                                placeholder="161"
                                value={medicationBuyNew ?? ""}
                                onChange={e => setMedicationBuyNew(e.target.value)}

                                onBlur={() => {
                                    setMedicationBuyNew(prev => {
                                        if (prev === "" || isNaN(prev)) return "";
                                        return Number(prev).toFixed(2);
                                    });
                                }}
                            />
                            <span
                                className="unit">
                            {getMedicationUnit(medicationType)}
                        </span>
                        </div>
                    </div>
                    {(medicationBuyNew < 0) && (
                        <div className="warning warning--spaced">
                            Bitte gib eine gültige Menge ein.
                        </div>
                    )}
                </div>
            </div>

            <button
                className="control button button-next"
                disabled={medicationStock === "" || medicationStock < 0 || medicationBuyNew < 0}
                onClick={nextPage}
            >
                Weiter
            </button>
        </div>
    );
}

export default AddStock;