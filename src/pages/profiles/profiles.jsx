import PersonIcon from "../../assets/person-round.svg";
import "./Profiles.css"
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import TaskItem from "../../components/TaskItem/TaskItem";
import {deleteEntries} from "./delete";
import {NavigationBar} from "../../components/NavigationBar/NavigationBar";
import {useGlobal} from "../globalContext";


export default function Profile() {
    const navigate = useNavigate();
    const {
        profilePatients,
        setProfilePatients,
        profileMedications,
        setProfileMedications,
        profileReminders,
        setProfileReminders,
        profileActiveProfile,
        setProfileActiveProfile
    } = useGlobal();


    function handleClick() {
        navigate("/profile/add");
    }

    useEffect(() => {
        async function loadPatients() {
            const loadedPatients = await db.profiles.toArray();
            setProfilePatients(loadedPatients);
        }

        loadPatients();
    }, [])

    useEffect(() => {
        async function loadMedications() {
            const loadedMedications = await db.medications.toArray();
            setProfileMedications(loadedMedications);
        }

        loadMedications();
    }, [])

    useEffect(() => {
        async function loadReminders() {
            const loadedReminders = await db.reminders.toArray();
            setProfileReminders(loadedReminders);
        }

        loadReminders();
    }, [])


    useEffect(() => {
        if (!profileActiveProfile && profilePatients.length > 0) {
            setProfileActiveProfile(profilePatients[0]);
        }
    }, [profilePatients]);

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
            {
                profilePatients.map(therapyProfile => {
                    return <div className="therapyProfile" key={therapyProfile.id}>
                        <img alt="" className={"task-item__person"} src={PersonIcon}/>
                        {
                            therapyProfile.name
                        }
                        <button
                            className={"control button profile__delete-button"}
                            onClick={() => handleDelete(therapyProfile.id)}>
                            Profil löschen
                        </button>
                        <button
                            className={"control button profile__active-button"}
                            onClick={() => {
                                setProfileActiveProfile(therapyProfile);

                            }}>
                            Pläne anzeigen
                        </button>
                        <div>
                            {profileActiveProfile?.id === therapyProfile.id &&
                                profileReminders
                                    .filter(r => r.profileId === profileActiveProfile.id)
                                    .map(reminder => {

                                        const patient = profilePatients.find(p => p.id === reminder.profileId);
                                        console.log(profileMedications?.find(m => m.id === reminder.medicationId));
                                        const medication = profileMedications?.find(m => m.id === reminder.medicationId);
                                        if (!patient || !medication) return null;

                                        return <TaskItem
                                            key={reminder.id}
                                            patient={patient}
                                            medication={medication}
                                            time={reminder.time}
                                            dose={reminder.dose}
                                            showTime={true}/>
                                    })}
                        </div>
                    </div>
                })
            }

            <button
                className={"control button profile__add-button"}
                onClick={handleClick}> Profil hinzufügen
            </button>
            <NavigationBar/>
        </div>
    )
}

