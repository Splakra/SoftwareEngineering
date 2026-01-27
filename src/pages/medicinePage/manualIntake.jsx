import PageHeader from "../../components/PageHeader/PageHeader";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import db from "../../database/DexieDatabase";

export default function manualIntake() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const {id} = useParams();

    const [medication, setMedication] = useState()
    useEffect(() => {
        async function loadMedication() {
            const loadedMedication = await db.medications.where("id").equals(Number.parseInt(id)).first();
            setMedication(loadedMedication);
        }

        loadMedication();
    }, [])

    async function nextPage() {
        await db.medications.update(Number.parseInt(id), {amount: medication?.amount - Number.parseFloat(amount)})
        navigate("/medication")
    }

    const getUnit = () => {
        switch (medication?.type) {
            case "pills":
                return "Tabletten";
            case "fluid":
            case "drops":
                return "ml";
            default:
                return "Sonstige";
        }
    };

    return (
        <div className="manual-intake page">
            <PageHeader title={"Einzelgabe hinzufügen"}
                        quitPath={"/medication"}/>

            <div className="query-wrapper">
                <h2 className="title">
                    Wie viel wurde verabreicht?
                </h2>

                <label htmlFor="doseInput">
                    Verabreichte Menge
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
                            placeholder="161"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                        <span
                            className="unit">
                            {getUnit()}
                        </span>
                    </div>
                </div>
                {(amount < 0) && (
                    <div className="warning warning--spaced">
                        Bitte gib eine gültige Menge ein.
                    </div>
                )}
            </div>

            <button
                className="control button button-next"
                onClick={nextPage}
                disabled={!amount || amount < 0}
            >
                Speichern
            </button>
        </div>
    );
}