import PersonIcon from "../../assets/person-round.svg";
import "./Profiles.css"
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import TaskItem from "../../components/TaskItem/TaskItem";


export default function Profile() {
    const navigate = useNavigate();


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


    const [reminders, setReminders] = useState([])
    useEffect(() => {
        async function loadReminders() {
            const loadedReminders = await db.reminders.toArray();
            setReminders(loadedReminders);
        }
        loadReminders();
    })

   // const [activeProfile , setActiveProfile] = useState(patients[0]);
    let activeProfile = patients[0];


    function handleDelete(id) {
        db.profiles.delete(id); //löschen von db einträgen
        window.location.reload(); //neu laden der Seite
        return null;
    }

    function setActiveProfile (id){
        activeProfile = id;
    }

    //console.log(activeProfile);

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
                                setActiveProfile(profile.id);
                                window.location.reload();
                            }}>
                                Pläne anzeigen
                            </button>
                            <div>
                                {activeProfile?.id === profile.id ?
                                    (reminders
                                        .filter(r => r.profileId === activeProfile?.id)
                                        .map(reminder => {
                                        return <TaskItem key={reminder.id} {...reminder} />
                                })) : null}
                            </div>
                        </div>
                    })
                }

            <button onClick={handleClick}> Profil hinzufügen </button>
        </div>
    )
}

