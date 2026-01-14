//back & quit auslagern für alle verfügbar

import './chooseMedication.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "./globalContext";
import ArrowIcon from "../../assets/triangle-down.svg";


function ChooseMedication() {
    const navigate = useNavigate();
    const {medication, setMedication} = useGlobal();

    function nextPage() {
        navigate("/addTherapy/dose")
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
        <div className={"choose-medication"}>
            <PageHeader title="einnahme hinzufügen"/>

            <h2 className={"choose-medication__intro"}>
                Welches Medikament soll verabreicht werden?
            </h2>

            <div className={"choose-medication__existing"}>
                <label>
                    Vorhandenes Medikament auswählen
                    <div className="select-wrapper">
                        <select
                            className={`control-base select-base ${
                                medication === "" || medication == null ? "is-placeholder" : ""
                            }`}
                            value={medication ?? ""}
                            onChange={e => setMedication(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Glitzerheilstaub
                            </option>
                            {medications.map(med => (
                                <option key={med.id} value={JSON.stringify(med)}>
                                    {med.name}
                                </option>
                            ))}
                        </select>

                        <img
                            src={ArrowIcon}
                            alt=""
                            aria-hidden="true"
                            className="select-arrow"
                        />
                    </div>
                </label>
            </div>

            <div>
                <span>oder</span>
                <button className="control-base button-base choose-medication__new">
                    Medikament hinzufügen
                </button>
            </div>

            <button
                className="control-base button-base choose-medication__next"
                onClick={nextPage}
                disabled={!medication}
            >
                Weiter
            </button>

        </div>
    );
}

export default ChooseMedication;