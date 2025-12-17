import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";

export default function profileTask (id){

    const [patients, setPatients] = useState([])
    useEffect(() => {
        async function loadPatients() {
            const loadedPatients = await db.profiles.toArray();
            setPatients(loadedPatients);
        }

        loadPatients();
    }, [])

    const activePatient = db.profiles.id(id)

    return (
        <div className={"profilTask__item"}>
            <div className={"profilTask__med"}>
                <div className={"profilTask__start"}>
                    <div className={"profilTask__end"}>
                        <div className={"profilTask__dosis"}>
                            <div className={"profilTask__rhythm"}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}