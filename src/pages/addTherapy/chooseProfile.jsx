//back & quit auslagern für alle verfügbar

import './ChooseProfile.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "./GlobalContext";


function ChooseProfile() {
    const navigate = useNavigate();
    const {profile, setProfile} = useGlobal();

    async function nextPage() {
        navigate("/addTherapy/medication")
    }

    const [patients, setPatients] = useState([])
    useEffect(() => {
        async function loadPatients() {
            const loadedPatients = await db.profiles.toArray();
            setPatients(loadedPatients);
        }

        loadPatients();
    }, [])

    return (
        <div className="chooseProfile">
            <NavigationButtons title="Einnahme hinzufügen"/>
            <div className={"chooseProfile__content"}>
                Für wen soll eine neue Einnahme angelegt werden?
            </div>
            <div className={"choose-profile_existing-Patient"}>
                <div>Patient*in auswählen</div>
                <select onChange={e => setProfile(e.target.value)} value={profile}>
                    <option selected></option>
                    {
                        patients.map(profile => {
                            return <option value={JSON.stringify(profile)}>
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
            <button onClick={nextPage} disabled={!profile}>
                Weiter
            </button>
        </div>
    );
}

export default ChooseProfile;