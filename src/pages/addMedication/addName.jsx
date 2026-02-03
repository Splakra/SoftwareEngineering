import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../globalContext";

export default function AddName() {
    const navigate = useNavigate();
    const { medicationName, setMedicationName, medicationId } = useGlobal();

    function nextPage() {
        navigate("/addMedication/type", {viewTransition: true})
    }

    return (
        <div className="page">
            <PageHeader title={medicationId ? "Medikament bearbeiten" : "Medikament hinzufügen"}
                        quitPath={"/medication"} />
            <div className="view-transition-form">
                <div className="query-wrapper">
                    <h2 className={"title"}>
                        Füge ein neues Medikament hinzu!
                    </h2>

                    <label htmlFor="medication-name">
                        Name des Medikaments eingeben
                    </label>
                    <div className="input-wrapper">
                        <input
                            className="control input"
                            id="medication-name"
                            type="text"
                            placeholder="Glitzerheilstaub"
                            value={medicationName || ""}
                            onChange={e => setMedicationName(e.target.value)}/>
                    </div>
                </div>
            </div>
            <button
                className="control button button-next"
                onClick={nextPage}
                disabled={!medicationName?.trim()}
            >
                Weiter
            </button>
        </div>
    );
}
