import './dashboard.css';
import db from '../../database/DexieDatabase.js';
import {useEffect, useState} from "react";
import TaskItem from "../../components/TaskItem/TaskItem";
import PlusIcon from "../../assets/plus-icon.svg";
import {useNavigate, useRevalidator} from "react-router";

export async function clientLoader() {
    const reminders = await db.reminders.orderBy("time").toArray(); // get all reminders
    await Promise.all( // wait until all async functions inside the parenthesis are done
        reminders.map(async (reminder) => {
            console.log(reminder);
            [reminder.medication, reminder.patient] = await Promise.all(
                [
                    db.medications.where({id: reminder.medicationId}).first(), // .first(): get first as object, not as array like in .limit(1)
                    db.profiles.where({id: reminder.profileId}).first()
                ]
            )
        })
    )
    return {
        reminders
    };
}

function Dashboard({loaderData}) {
    const {reminders} = loaderData;
    const revalidator = useRevalidator(); // only for now

    const weekly = [-2, -1, 0, 1, 2].map(value => {
        const today = new Date();
        today.setDate(today.getDate() + value);
        return today;
    })
    const currentDate = new Date();
    const navigate = useNavigate();

    // dummy profile & medication
    db.profiles.add({name: 'Sunny'})
    db.medications.add({
        name: 'Melosus',
        type: 'fluid',
        amount: 3.5,
        reminderBuyNew: 10
    })

    //Einnahme hinzufügen
    async function addIntake() {
        navigate("/addTherapy/profile")
    }

    const [activeDay, setActiveDay] = useState(() => {
        return currentDate.getDate(); // default: today
    });

    function handleDayClick(day) {
        setActiveDay(day.getDate());
    }

    return (
        <div className={"dashboard"}>
            <section className={"calendar"}>
                <h2 className={"calendar__date"}>
                    {currentDate.toLocaleDateString("de-DE", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                    })}
                </h2>
                <div className={"calendar__week"}>
                    {weekly.map(day => (
                        <div key={day.toISOString()}
                             className={"calendar__weekday"}
                             onClick={() => handleDayClick(day)}>
                            <div className={"calendar__weekday-name"}>
                                {day.toLocaleDateString("de-DE", {weekday: "short"})}
                            </div>
                            <div
                                className={`calendar__weekday-number ${activeDay === day.getDate() ? "calendar__weekday-number--active" : ""}`}>
                                {day.getDate()}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div className="dashboard__content">
                {reminders.map((reminder, index) => {
                    reminder.showTime = true;
                    if (index > 0) {
                        reminder.showTime = reminder.time === reminders[index - 1].time ? null : reminder.time;
                    }
                    return (<TaskItem key={reminder.id} {...reminder} />)
                })
                }
                <button className={"dashboard__add-button"} onClick={addIntake}>
                    <img alt="" className={"dashboard__plus-icon"} src={PlusIcon}/>
                    Hinzufügen
                </button>
            </div>
        </div>
    );
}

export default Dashboard;