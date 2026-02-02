import './chooseProfile.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useGlobal} from "../globalContext";

function ChooseProfile() {
    const navigate = useNavigate();
    const {therapyProfile, setTherapyProfile, setRouteBackToChooseProfile, resetProfile} = useGlobal();
    const [patients, setPatients] = useState([])

    useEffect(() => {
        async function loadPatients() {
            const loadedPatients = await db.profiles.toArray();
            setPatients(loadedPatients);
        }

        loadPatients();
    }, [])

    function addProfile() {
        setRouteBackToChooseProfile(true);
        resetProfile();
        navigate("/profile/add");
    }

    function nextPage() {
        navigate("/addTherapy/medication")
    }

    return (
        <div className="choose-profile page">
            <PageHeader title="einnahme hinzufügen"/>

            <div className="query-wrapper">
                <h2 className="title">
                    Für wen ist die Einnahme?
                </h2>

                <div className={"choose-profile__existing"}>
                    <label>
                        Profil auswählen
                        <div className="select-wrapper">
                            <select
                                className={`control select ${therapyProfile === "" || therapyProfile == null ? "is-placeholder" : ""}`}
                                value={therapyProfile ?? ""}
                                onChange={e => setTherapyProfile(e.target.value)}
                                disabled={patients.length === 0}
                            >
                                <option value="" hidden>
                                    {patients.length === 0 ? "Noch nichts angelegt" : "Schnurzipups"}
                                </option>
                                {patients.map(profile => (
                                    <option key={profile.id} value={JSON.stringify(profile)}>
                                        {profile.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>
                </div>

                <div className="choose-profile__alternative">
                    <span className="choose-profile__or">oder</span>
                    <button
                        className="control button choose-profile__new"
                        onClick={addProfile}
                    >
                        Profil hinzufügen
                    </button>
                </div>
            </div>

            <button
                className="control button button-next"
                onClick={nextPage}
                disabled={!therapyProfile}
            >
                Weiter
            </button>

        </div>
    );
}

export default ChooseProfile;