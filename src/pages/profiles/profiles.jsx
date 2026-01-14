import PersonIcon from "../../assets/person-round.svg";
import "./Profiles.css"
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import TaskItem from "../../components/TaskItem/TaskItem";
import {deleteEntries} from "./delete";
import {NavigationBar} from "../../components/NavigationBar/NavigationBar";


export default function Profile() {
    const navigate = useNavigate();

    //dummy medication


    function handleClick() {
        navigate("/profile/add");
    }

    const [patients, setPatients] = useState([])
    useEffect(() => {
        async function loadPatients() {
            const loadedPatients = await db.profiles.toArray();
            setPatients(loadedPatients);
        }

        loadPatients();
    }, [])

    const [medications, setMedications] = useState([])
    useEffect(() => {
        async function loadMedications() {
            const loadedMedications = await db.medications.toArray();
            setMedications(loadedMedications);
        }

        loadMedications();
    }, [])

    const [reminders, setReminders] = useState([])
    useEffect(() => {
        async function loadReminders() {
            const loadedReminders = await db.reminders.toArray();
            setReminders(loadedReminders);
        }

        loadReminders();
    }, [])

    const [activeProfile, setActiveProfile] = useState(null);

    useEffect(() => {
        if (!activeProfile && patients.length > 0) {
            setActiveProfile(patients[0]);
        }
    }, [patients]);

    function handleDelete(id) {
        db.profiles.delete(id); //löschen von db einträgen
        window.location.reload(); //neu laden der Seite
        return null;
    }
    


    return (
        <div className={"profile"}>
            {
                patients.map(profile => {
                    return <div className="profile" key={profile.id}>
                        <img alt="" className={"task-item__person"} src={PersonIcon}/>
                        {
                            profile.name
                        }
                        <button
                            className={"control-base button-base profile__delete-button"}
                            onClick={() => handleDelete(profile.id)}>
                            Profil löschen
                        </button>
                        <button
                            className={"control-base button-base profile__active-button"}
                            onClick={() => {
                            setActiveProfile(profile);

                        }}>
                            Pläne anzeigen
                        </button>
                        <div>
                            {activeProfile?.id === profile.id &&
                                reminders
                                    .filter(r => r.profileId === activeProfile.id)
                                    .map(reminder => {

                                        const patient = patients.find(p => p.id === reminder.profileId);
                                        console.log(medications?.find(m => m.id === reminder.medicationId));
                                        const medication = medications?.find(m => m.id === reminder.medicationId);
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
                className={"control-base button-base profile__add-button"}
                onClick={handleClick}> Profil hinzufügen</button>
            <NavigationBar/>
        </div>
    )
}

