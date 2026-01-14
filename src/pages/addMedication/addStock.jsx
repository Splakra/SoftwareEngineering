import './addName.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "../globalContext";


function addStock() {
    const navigate = useNavigate();
    const {
        medicationStock,
        setMedicationStock,
        medicationBuyNew,
        setMedicationBuyNew,
        medicationType,
        medicationId
    } = useGlobal();


    async function nextPage() {
        navigate("/addMedication/expirationDate")
    }

    return (
        <div className="addStock">
            <PageHeader title={medicationId ? "Medikament bearbeiten" : "Medikament hinzufügen"}
                        quitPath={"/medication"}/>
            <div className={"addStock__content"}>
                Wie viel ist von dem Medikament vorrätig?
            </div>
            <div>
                <div>Aktueller Vorrat</div>
                <input type="number" value={medicationStock} onChange={e => setMedicationStock(e.target.value)}/>
                <div>{(() => {
                    switch (medicationType) {
                        case"pills":
                            return "Tabletten"

                        case"fluid":
                            return "ml"

                        case"drops":
                            return "ml"
                    }
                })()}</div>
            </div>
            <div className={"addStock__content"}>
                Möchten Sie rechtzeitig an die nächste Packung erinnert werden? (optional)
            </div>
            <div>
                <div>Erinnerung ab</div>
                <input type="number" value={medicationBuyNew} onChange={e => setMedicationBuyNew(e.target.value)}/>
                <div>{(() => {
                    switch (medicationType) {
                        case"pills":
                            return "Tabletten"

                        case"fluid":
                            return "ml"

                        case"drops":
                            return "ml"
                    }
                })()}</div>
            </div>
            <button onClick={nextPage} disabled={!medicationStock}>
                Weiter
            </button>
        </div>
    );
}

export default addStock;