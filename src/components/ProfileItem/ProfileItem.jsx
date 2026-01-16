import TaskItem from "../TaskItem/TaskItem";
import {useGlobal} from "../../pages/globalContext";
import db from "../../database/DexieDatabase";
import PersonIcon from "../../assets/person-round.svg";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import PlusIconWhite from "../../assets/plus-icon-white.svg";
import PencilIcon from "../../assets/pencil.svg";
import TrashIcon from "../../assets/trash.svg";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";


export default function ProfileItem({id, name}) {
    const {setProfileEdit} = useGlobal();
    const navigate = useNavigate();

    const [profileReminders, setProfileReminders] = useState([])
    useEffect(() => {
        async function loadReminders() {
            const loadedReminders = await db.reminders.where("profileId").equals(id).toArray();
            for (const reminder of loadedReminders) {
                const currentMedication = await db.medications.where("id").equals(reminder.medicationId).first();
                reminder.medication = currentMedication;
                const currentPatient = await db.profiles.where("id").equals(reminder.profileId).first()
                reminder.patient = currentPatient;
            }
            setProfileReminders(loadedReminders);
            console.log(loadedReminders)
        }

        loadReminders();
    }, [])


    function deleteProfile() {
        db.reminders.where("profileId").equals(id).delete();
        db.profiles.delete(id); //löschen von db einträgen
        window.location.reload(); //neu laden der Seite
        return null;
    }

    function editProfile() {
        setProfileEdit({
            id,
            name
        });
        navigate("/profile/add");
    }


    return (
        <div className="profile" key={name.id}>
            <img alt="" className={"profile-item__person"} src={PersonIcon}/>
            <div className={"profile-item__name"}>
                {name}
            </div>

            <ToggleMenu className="profile-toggle"
                        items={[{
                            label: "Profil bearbeiten",
                            icon: PencilIcon,
                            onClick: () => editProfile()
                        }, {
                            label: "Profil löschen", // Achtung: Löscht alle zugehörigen Erinnerungen!
                            icon: TrashIcon,
                            onClick: () => deleteProfile()
                        }]}/>

            <div>

                {

                    profileReminders.map((reminder, index) => {
                        reminder.showTime = true;
                        if (index > 0) {
                            reminder.showTime = reminder.time === profileReminders[index - 1].time ? null : reminder.time;
                        }
                        return (<TaskItem key={reminder.id} {...reminder} />)
                    })


                }

            </div>
        </div>
    )
}