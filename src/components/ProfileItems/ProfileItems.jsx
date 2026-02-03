import './ProfileItems.css';
import db from "../../database/DexieDatabase";
import { deleteEntries } from "../../pages/profiles/delete";
import { useEffect, useState } from "react";
import InfoItem from "../InfoItems/InfoItem";

export default function ProfileItems({ activeProfile }) {
    const [medications, setMedications] = useState([])
    const [dailyReminder, setDailyReminder] = useState([]);
    const [weekdayReminder, setWeekdayReminder] = useState([]);
    const [intervalReminder, setIntervalReminder] = useState([]);

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
            setWeekdayReminder(filteredReminders.filter(r => r.rhythm === "weekdays").sort((a, b) => (a.weekdayTime ?? "00:00").localeCompare(b.weekdayTime ?? "00:00")));
        }

        loadMedications();
        loadReminders();
    }, [activeProfile])


    return (
        <div className={"profiles__active-profile"}>
            {[
                ["Täglich", dailyReminder],
                ["Bestimmte Wochentage", weekdayReminder],
                ["Intervall", intervalReminder]
            ].map(([reminderLabel, reminders], index) => {
                if (reminders.length === 0) return null;

                return (
                    <section key={index} className="profiles__reminder-group">
                        <h4 className="profiles__reminder-group-title">{reminderLabel}</h4>
                        <ul className="profiles__reminder-list">
                            {reminders
                                .filter(r => r.profileId === activeProfile.id)
                                .map(reminder => {
                                    const medication = medications?.find(
                                        m => m.id === reminder.medicationId
                                    );
                                    if (!activeProfile || !medication) return null;

                                    return (
                                        <li key={reminder.id} className="profiles__reminder-list-item">
                                            <InfoItem
                                                {...reminder}
                                                patient={activeProfile}
                                                medication={medication}
                                                showTime={true}
                                            />
                                        </li>
                                    );
                                })}
                        </ul>
                    </section>
                )
            })}

        </div>
    )
}