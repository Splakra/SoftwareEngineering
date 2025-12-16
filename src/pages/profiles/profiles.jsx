import PersonIcon from "../../assets/person-round.svg";
import "./Profiles.css"
import NewProfile from "./newProfile";
import {useNavigate} from "react-router";

export default function Profile({name}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/profile/add");
    }

    return (
        <div className={"profile-item"}>
            <div className = {"profile__name"}>
                <div className={"task-item__icon"}>
                    <img alt="" className={"task-item__person"} src={PersonIcon}/>
                </div>
                {name}
            </div>
            <button onClick={handleClick}> Profil hinzufügen </button>
        </div>
    )
}

