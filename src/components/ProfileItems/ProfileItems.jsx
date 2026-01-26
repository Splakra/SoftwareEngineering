import db from "../../database/DexieDatabase";
import {deleteEntries} from "../../pages/profiles/delete";
import {useEffect, useState} from "react";
import {useGlobal} from "../../pages/globalContext";
import TaskItem from "../TaskItem/TaskItem";
import InfoItem from "../InfoItems/InfoItem";

export default function ProfileItems({activeProfile}) {
    const [medications, setMedications] = useState([])
    const [dailyReminder, setDailyReminder] = useState([]);
    const [intervalReminder, setIntervalReminder] = useState([]);
    const [weekdayReminder, setWeekdayReminder] = useState([]);
    useEffect(() => {
        async function loadMedications() {
            const loadedMedications = await db.medications.toArray();
            setMedications(loadedMedications);
        }

        async function loadReminders() {
            const loadedReminders = await db.reminders.toArray();
            const filteredReminders = loadedReminders.filter(r => r.profileId === activeProfile.id)
            setDailyReminder(filteredReminders.filter(r => r.rhythm === "daily").sort((a, b) => a.dailyTime[0].localeCompare(b.dailyTime[0])));
            setIntervalReminder(filteredReminders.filter(r => r.rhythm === "interval"));
            setWeekdayReminder(filteredReminders.filter(r => r.rhythm === "weekdays").sort((a, b) => a.weekdayTime.localeCompare(b.weekdayTime)));
        }

        loadMedications();
        loadReminders();
    }, [activeProfile])


    return (
        <div className={"profile-page__active-profile"}>
            {[
                ["Täglich", dailyReminder],
                ["Bestimmte Wochentage", weekdayReminder],
                ["Intervall", intervalReminder]
            ].map(([reminderLabel, reminders], index) => {
                return (reminders.length !== 0 ?
                        <div key={index}>
                            <div>{reminderLabel}</div>
                            <div>
                                {reminders.filter(r => r.profileId === activeProfile.id).map(reminder => {

                                    const medication = medications?.find(m => m.id === reminder.medicationId);
                                    if (!activeProfile || !medication) return null;

                                    return <InfoItem
                                        {...reminder}
                                        key={reminder.id}
                                        patient={activeProfile}
                                        medication={medication}
                                        showTime={true}/>
                                })}
                            </div>
                        </div> : null
                )
            })}

        </div>
    )
}