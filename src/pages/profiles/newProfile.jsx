import db from "../../database/DexieDatabase";
import PageHeader from "../../components/PageHeader/PageHeader";
import {useNavigate} from "react-router-dom";
import {useGlobal} from "../globalContext";

export default function NewProfile() {
    const navigate = useNavigate();
    const {
        profileId,
        setProfileId,
        profileName,
        setProfileName,
        routeBackToChooseProfile,
        setRouteBackToChooseProfile,
        resetProfile
    } = useGlobal();


    function handleClick() {
        if (profileId) {
            db.profiles.put({
                id: profileId,
                name: profileName
            })
        } else {
            db.profiles.add({
                name: profileName
            })
        }
        resetProfile();
        if (routeBackToChooseProfile) {
            setRouteBackToChooseProfile(false);
            navigate("/addTherapy/profile");
        } else {
            navigate("/profile");
        }
    }

    return (
        <div className="new-profile page">
            <PageHeader title={profileId ? "Profil bearbeiten" : "Profil hinzufügen"}
                        quitPath={"/profile"}/>
            <div className="query-wrapper">
                <h2 className="title">
                    Füge ein neues Profil hinzu!
                </h2>
                <label htmlFor="profile-name">
                    Name des Profils eingeben
                </label>
                <div className="input-wrapper">
                    <input
                        className="control input"
                        id="profile-name"
                        type="text"
                        placeholder="Schnurzipups"
                        value={profileName || ""}
                        onChange={e => setProfileName(e.target.value)}/>
                </div>
            </div>

            <button
                className="control button button-next"
                disabled={!profileName?.trim()}
                onClick={handleClick}
            >
                Speichern
            </button>
        </div>
    )
}