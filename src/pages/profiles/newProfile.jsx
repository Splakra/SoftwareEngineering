import db from "../../database/DexieDatabase";
import PageHeader from "../../components/PageHeader/PageHeader";
import {useNavigate} from "react-router";
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
        <div>
            <PageHeader title={profileId ? "Profil bearbeiten" : "Profil hinzufügen"}
                        quitPath={"/profile"}/>
            <div>
                <h1> "Wie heißt dein/e Patient/in?" </h1>
                <label>
                    <p> Name eingeben </p>
                    <input type={"text"} value={profileName} onChange={e => setProfileName(e.target.value)}/>
                </label>
                <button type="submit" onClick={handleClick}> Speichern</button>
            </div>
        </div>
    )
}