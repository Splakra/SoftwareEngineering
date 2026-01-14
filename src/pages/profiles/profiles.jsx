import PersonIcon from "../../assets/person-round.svg";
import "./Profiles.css"
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import TaskItem from "../../components/TaskItem/TaskItem";
import {deleteEntries} from "./delete";


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


    const handleDeleteEntries = async () => {//schnelles entfernen von medikamenten
        const keepIds = [1, 2]; // die 2 IDs, die bleiben sollen
        await deleteEntries(keepIds);
        alert('Gelöscht – nur die gewünschten Einträge bleiben.');
    };


    return (
        <div className={"profile-item"}>
                {
                    patients.map(profile => {
                        return <div className="profile-item" key={profile.id}>
                            <img alt="" className={"task-item__person"} src={PersonIcon}/>
                            {
                                profile.name
                            }
                            <button onClick={() => handleDelete(profile.id)}>
                                Profil löschen
                            </button>
                            <button onClick={()=> {
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
                                            showTime={true}/>
                                })}
                            </div>
                        </div>
                    })
                }

            <button onClick={handleClick}> Profil hinzufügen </button>
            <button onClick={() => handleDeleteEntries(1, 6)}> lösche alle Medikamente aus Datenbank</button>
            <button onClick={() => db.medications.add({
                name: "test2",
                amount: 10,
                type: "drops"
            })}> med hinzufügen </button>
            <button onClick={() => db.reminders.add({
                profileId: 75,
                medicationId: medications[2].id,
            })}> reminder </button>
        </div>
    )
}

