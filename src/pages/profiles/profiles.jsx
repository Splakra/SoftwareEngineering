import PersonIcon from "../../assets/person-round.svg";
import "./Profiles.css"
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import TaskItem from "../../components/TaskItem/TaskItem";
import {deleteEntries} from "./delete";
import {NavigationBar} from "../../components/NavigationBar/NavigationBar";
import {useGlobal} from "../globalContext";
import ProfileItems from "../../components/ProfileItems/ProfileItems";


export default function Profile() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/profile/add");
    }

    const [patients, setPatients] = useState([])
    const [profileActiveProfile, setProfileActiveProfile] = useState()
    useEffect(() => {
        async function loadPatients() {
            const loadedPatients = await db.profiles.toArray();
            setPatients(loadedPatients);
            if (!profileActiveProfile && loadedPatients.length > 0) {
                setProfileActiveProfile(loadedPatients[0]);
            }
        }

        loadPatients();
    }, [])

    function handleDelete(id) {
        db.reminders.where("profileId").equals(id).delete();
        db.profiles.delete(id); //löschen von db einträgen
        window.location.reload(); //neu laden der Seite
        return null;
    }

    const handleDeleteEntries = async () => {//schnelles entfernen von medikamenten
        const keepIds = [1, 2]; // die 2 IDs, die bleiben sollen
        await deleteEntries(keepIds);
        alert('Gelöscht – nur die gewünschten Einträge bleiben.');
    };

    return (
        <div className={"therapyProfile"}>
            <div className={"profile-page__profiles"}>
                {
                    patients.map(therapyProfile => {
                        return <div className="therapyProfile" key={therapyProfile.id}>
                            <img alt="" className={"task-item__person"} src={PersonIcon} onClick={() => {
                                setProfileActiveProfile(therapyProfile)
                            }}/>
                            {
                                therapyProfile.name
                            }
                            <button
                                className={"control button profile__delete-button"}
                                onClick={() => handleDelete(therapyProfile.id)}>
                                Profil löschen
                            </button>
                        </div>
                    })
                }
            </div>
            {profileActiveProfile && <ProfileItems activeProfile={profileActiveProfile}/>}
            <button
                className={"control button profile__add-button"}
                onClick={handleClick}> Profil hinzufügen
            </button>
            <NavigationBar/>
        </div>
    )
}

