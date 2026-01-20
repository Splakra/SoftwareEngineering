import './chooseMedication.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "../globalContext";
import {add} from "dexie";

function ChooseMedication() {
    const navigate = useNavigate();
    const {therapyMedication, setTherapyMedication, setRouteBackToChooseMedication, resetMedication} = useGlobal();

    function nextPage() {
        navigate("/addTherapy/dose")
    }

    async function addMedication() {
        setRouteBackToChooseMedication(true);
        resetMedication();
        navigate("/addMedication/name")
    }


    const [medications, setMedications] =
        useState([])
    useEffect(() => {
        async function loadMedication() {
            const loadedMedication = await db.medications.toArray();
            setMedications(loadedMedication);
        }

        loadMedication();
    }, [])

    return (
        <div className={"page"}>
            <PageHeader title="einnahme hinzufügen"/>

            <h2 className={"title"}>
                Welches Medikament soll verabreicht werden?
            </h2>

            <div className={"choose-medication__existing"}>
                <label>
                    Vorhandenes Medikament auswählen
                    <div className="select-wrapper">
                        <select
                            className={`control select ${
                                therapyMedication === "" || therapyMedication == null ? "is-placeholder" : ""
                            }`}
                            value={therapyMedication ?? ""}
                            onChange={e => setTherapyMedication(e.target.value)}
                            disabled={medications.length === 0}
                        >
                            <option value="" hidden>
                                {medications.length === 0 ? "Noch nichts angelegt" : "Glitzerheilstaub"}
                            </option>
                            {medications.map(med => (
                                <option key={med.id} value={JSON.stringify(med)}>
                                    {med.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>
            </div>
            <div>
                <span>oder</span>
                <button
                    onClick={addMedication}
                    className="control button choose-medication__new"
                >
                    Medikament hinzufügen
                </button>
            </div>

            <button
                className="control button button-next"
                onClick={nextPage}
                disabled={!therapyMedication}
            >
                Weiter
            </button>

        </div>
    );
}

export default ChooseMedication;