import PersonIcon from "../../assets/person-round.svg";
import "./Profiles.css"
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

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

    function handleDelete(id) {
        db.profiles.delete(id); //löschen von db einträgen
        window.location.reload(); //neu laden der Seite
        return null;
    }

    return (
        <div className={"profile-item"}>
            <div className={"profile__name"}>
                <div className={"task-item__icon"}>

                </div>
                {
                    patients.map(profile => {
                        return <div>
                            <img alt="" className={"task-item__person"} src={PersonIcon}/>
                            {
                                profile.name
                            }
                            <button onClick={() => handleDelete(profile.id)}>
                                Profil löschen
                            </button>

                        </div>
                    })
                }
            </div>
            <button onClick={handleClick}> Profil hinzufügen </button>
        </div>
    )
}

