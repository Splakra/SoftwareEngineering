//back & quit auslagern für alle verfügbar

import './ChooseProfile.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";


function ChooseProfile() {
    const [patients, setPatients] = useState([])
    useEffect(() => {
        async function loadPatients() {
            const loadedPatients = await db.profiles.toArray();
            setPatients(loadedPatients);
        }

        loadPatients();
    }, [])

    return (
        <div>
            <NavigationButtons title="Einnahme hinzufügen"/>
            <div className={"choose-profile_heading"}>
                Für wen soll eine neue Einnahme angelegt werden?
            </div>
            <div className={"choose-profile_existing-Patient"}>
                Patient*in auswählen
                <select>
                    {
                        patients.map(profile => {
                            return <option>
                                {
                                    profile.name
                                }
                            </option>
                        })
                    }
                </select>
            </div>
            <div className={"choose-profile_new-patient"}>
                oder
                <button>
                    Patient*in hinzufügen
                </button>
            </div>
            <button>
                Weiter
            </button>
        </div>
    );
}

export default ChooseProfile;