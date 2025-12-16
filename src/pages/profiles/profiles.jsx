import PersonIcon from "../../assets/person-round.svg";
import "./Profiles.css"
import NewProfile from "./newProfile";
import {useNavigate} from "react-router";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";

export default function Profile({name}) {
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


    return (
        <div className={"profile-item"}>
            <div className={"profile__name"}>
                <div className={"task-item__icon"}>
                    <img alt="" className={"task-item__person"} src={PersonIcon}/>
                </div>
                {
                    patients.map(profile => {
                        return <div>
                            {
                                profile.name
                            }

                        </div>
                    })
                }
            </div>
            <button onClick={handleClick}> Profil hinzufügen</button>
        </div>
    )
}

