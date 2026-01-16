import db from "../../database/DexieDatabase";
import {deleteEntries} from "../../pages/profiles/delete";
import {useEffect, useState} from "react";
import {useGlobal} from "../../pages/globalContext";
import TaskItem from "../TaskItem/TaskItem";

export default function ProfileItems({activeProfile}) {
    const [medications, setMedications] = useState([])
    const [reminders, setReminders] = useState([])
    useEffect(() => {
        async function loadMedications() {
            const loadedMedications = await db.medications.toArray();
            setMedications(loadedMedications);
        }

        async function loadReminders() {
            const loadedReminders = await db.reminders.toArray();
            setReminders(loadedReminders);
        }

        loadMedications();
        loadReminders();
    }, [])


    return (
        <div className={"profile-page__active-profile"}>
            {reminders.filter(r => r.profileId === activeProfile.id).map(reminder => {

                console.log(medications?.find(m => m.id === reminder.medicationId));
                const medication = medications?.find(m => m.id === reminder.medicationId);
                if (!activeProfile || !medication) return null;

                return <TaskItem
                    disableActions={true}
                    key={reminder.id}
                    patient={activeProfile}
                    medication={medication}
                    time={reminder.time}
                    dose={reminder.dose}
                    showTime={true}/>
            })}
        </div>
    )
}