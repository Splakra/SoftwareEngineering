import PersonIcon from "../../assets/person-round.svg";
import "./Profile.css"
import NewProfile from "./newProfile";

export default function Profile({name}) {
    return (
        <div className={"profile-item"}>
            <div className = {"profile__name"}>
                <div className={"task-item__icon"}>
                    <img alt="" className={"task-item__person"} src={PersonIcon}/>
                </div>
                {name}
            </div>
        </div>
    )
}

export function AddProfile(name) {
    //speicherung der Daten in Datenbank
    return (
        <button onClick={NewProfile}> Profil hinzufügen </button>
    );
}