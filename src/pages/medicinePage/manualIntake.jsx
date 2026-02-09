import PageHeader from "../../components/PageHeader/PageHeader";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import db from "../../database/DexieDatabase";
import {getDoseUnit, convertDoseToAmount} from "../../utils/therapyFormat";


export default function ManualIntake() {
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


    const doseTaken = Number(convertDoseToAmount(amount, medication?.type));


    async function nextPage() {
        await db.medications.update(Number.parseInt(id), {amount: (medication?.amount - Number.parseFloat(doseTaken))})
        navigate("/medication")
    }

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
                            {getDoseUnit(medication?.type)}
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