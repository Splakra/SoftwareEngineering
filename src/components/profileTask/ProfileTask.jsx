import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";

export default function profileTask ({id, start, end, dosis, rhythm, medication}){

    const [patients, setPatients] = useState([])
    useEffect(() => {
        async function loadPatients() {
            const loadedPatients = await db.profiles.toArray();
            setPatients(loadedPatients);
        }

        loadPatients();
    }, [])



   // const filteredReminders = reminders.filter(reminder => {reminder.id = id}); muss in profiles


    return (
        <div className={"profilTask__item"}>
            <div className={"profilTask__med"}>
                {medication}
                <div className={"profilTask__start"}>
                    {start}
                    <div className={"profilTask__end"}>
                        {end}
                    </div>
                    <div className={"profilTask__dosis"}>
                        {dosis}
                    </div>
                    <div className={"profilTask__rhythm"}>
                        {rhythm}
                    </div>
                </div>
            </div>
        </div>
    )
}