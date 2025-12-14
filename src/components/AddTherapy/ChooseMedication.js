//back & quit auslagern für alle verfügbar

import './ChooseMedication.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";


function ChooseMedication() {
    const [medication, setMedication] = useState([])
    useEffect(() => {
        async function loadMedication() {
            const loadedMedication = await db.medication.toArray();
            setMedication(loadedMedication);
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
                Vorhandenes Medikament auswählen
                <select>
                    {
                        medication.map(medication => {
                            return <option>
                                {
                                    medication.name
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
            <button>
                Weiter
            </button>
        </div>
    );
}

export default ChooseMedication;