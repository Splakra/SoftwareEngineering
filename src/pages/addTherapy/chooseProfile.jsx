//back & quit auslagern für alle verfügbar

import './chooseProfile.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "../globalContext";
import ArrowIcon from "../../assets/triangle-down.svg";

function ChooseProfile() {
    const navigate = useNavigate();
    const {profile, setProfile, setRouteBackToChooseProfile} = useGlobal();
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
        navigate("/profile/add");
    }

    function nextPage() {
        navigate("/addTherapy/medication")
    }

    return (
        <div className="choose-profile">
            <PageHeader title="einnahme hinzufügen"/>

            <h2 className={"choose-profile__intro"}>
                Für wen soll eine neue Einnahme angelegt werden?
            </h2>

            <div className={"choose-profile__existing"}>
                <label>
                    Profil auswählen
                    <div className="select-wrapper">
                        <select
                            className={`control-base select-base ${
                                profile === "" || profile == null ? "is-placeholder" : ""
                            }`}
                            value={profile ?? ""}
                            onChange={e => setProfile(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Schnurzipups
                            </option>
                            {patients.map(profile => (
                                <option key={profile.id} value={JSON.stringify(profile)}>
                                    {profile.name}
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
                <button
                    className="control-base button-base choose-profile__new"
                    onClick={addProfile}
                >
                    Profil hinzufügen
                </button>
            </div>

            <button
                className="control-base button-base choose-profile__next"
                onClick={nextPage}
                disabled={!profile}
            >
                Weiter
            </button>

        </div>
    );
}

export default ChooseProfile;