import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {NavigationBar} from "../../components/NavigationBar/NavigationBar";
import ProfileItem from "../../components/ProfileItem/ProfileItem";
import './profiles.css'
import TaskItem from "../../components/TaskItem/TaskItem";


function Profile() {

    const navigate = useNavigate();


    const [profiles, setProfiles] = useState([])
    useEffect(() => {
        async function loadProfiles() {
            const loadedProfiles = await db.profiles.toArray();
            setProfiles(loadedProfiles);
        }

        loadProfiles();
    }, [])


    function addProfile() {
        navigate("/profile/add");
    }


    return (
        <div className={"profile-page__content"}>
            <div className={"profile-page__profiles"}>
                {
                    profiles.map((profile, index) => {
                        if (index > 0) {
                            profile.name;
                        }
                        return (<ProfileItem key={profile.id}{...profile}/>)
                    })
                }
            </div>
            <div className={"profile-page__task-items"}>

            </div>
            <button
                className={"control button profile__add-button"}
                onClick={addProfile}> Profil hinzufügen
            </button>
            <NavigationBar/>
        </div>
    )
}

export default Profile

