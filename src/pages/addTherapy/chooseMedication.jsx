//back & quit auslagern für alle verfügbar

import './ChooseMedication.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "./GlobalContext";


function ChooseMedication() {
    const navigate = useNavigate();
    const {medication, setMedication} = useGlobal();

    async function nextPage() {
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
        <div>
            <NavigationButtons title="Einnahme hinzufügen"/>
            <div className={"choose-medication_heading"}>
                Füge eine neue Therapie hinzu!
            </div>
            <div className={"choose-medication_existing-medication"}>
                <div>Vorhandenes Medikament auswählen</div>
                <select onChange={e => setMedication(e.target.value)} value={medication}>
                    <option selected></option>

                    {
                        medications.map(med => {
                            return <option value={JSON.stringify(med)}>
                                {
                                    med.name
                                }
                            </option>
                        })
                    }
                </select>
            </div>
            <div className={"choose-medication_new-medication"}>
                oder
                <button>
                    Medikament hinzufügen
                </button>
            </div>
            <button onClick={nextPage} disabled={!medication}>
                Weiter
            </button>
        </div>
    );
}

export default ChooseMedication;