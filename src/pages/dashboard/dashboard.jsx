import './dashboard.css';
import db from '../../database/DexieDatabase.js';
import {useEffect, useState} from "react";
import TaskItem from "../../components/TaskItem/TaskItem";
import PlusIcon from "../../assets/plus-icon.svg";
import {useNavigate, useRevalidator} from "react-router";
import {NavigationBar} from "../../components/NavigationBar/NavigationBar";
import {useGlobal} from "../globalContext";


export async function clientLoader() {
    const reminders = await db.reminders.orderBy("time").toArray(); // get all reminders
    //console.log(reminders)
    await Promise.all( // wait until all async functions inside the parenthesis are done
        reminders.map(async (reminder) => {
            // console.log(reminder);
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

    const {therapyWeekday, setTherapyWeekday, therapyTime, setTherapyTime} = useGlobal();

    const weekly = [-2, -1, 0, 1, 2].map(value => {
        const today = new Date();
        today.setDate(today.getDate() + value);
        return today;
    })
    const currentDate = new Date();
    const navigate = useNavigate();


    const {resetTherapy} = useGlobal();

    function addIntake() {
        resetTherapy();
        navigate("/addTherapy/profile")
    }

    const [activeDay, setActiveDay] = useState(() => {
        return currentDate;//.getDate(); // default: today

    });


    function handleDayClick(day) {
        setActiveDay(day);//.getDate());
        // debugger;
    }

    function daysBetween(date1, date2) {
        const msPerDay = 1000 * 60 * 60 * 24;
        const utcA = Date.UTC(
            date1.getFullYear(),
            date1.getMonth(),
            date1.getDate()
        );

        const utcB = Date.UTC(
            date2.getFullYear(),
            date2.getMonth(),
            date2.getDate()
        );


        return Math.floor((utcB - utcA) / msPerDay);
    }

    function activeReminder(reminder) {
        //console.log(reminder)
        const start = new Date(reminder.startDate);
        //console.log(start)
        const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate())
        const end = reminder.endDate ? new Date(reminder.endDate) : null;
        const endDay = end ? new Date(end.getFullYear(), end.getMonth(), end.getDate()) : null;
        const activeDayOnly = new Date(activeDay.getFullYear(), activeDay.getMonth(), activeDay.getDate())
        const intervalMonthsValue = reminder.intervalValueMonths ? reminder.intervalValueMonths : null;
        //console.log(end, activeDay);
        const monthsDiff = (activeDay.getFullYear() - start.getFullYear()) * 12 + (activeDay.getMonth() - start.getMonth());

        const diffDays = daysBetween(start, activeDay);
        // const diffWeeksMs = Math.abs(startDay - activeDayOnly)
        // console.log(diffWeeksMs)
        // const msPerWeek = 7 * 24 * 60 * 60 * 1000;
        const msPerDay = 1000 * 60 * 60 * 24;
        // console.log(diffDays, activeDay - start, Math.floor((activeDay - start) / msPerDay), Math.floor((activeDay - start) / msPerDay) % reminder.intervalValue)

        switch (reminder.rhythm) {
            case "daily":
                return (startDay > activeDayOnly)
                    ? false
                    : (!(endDay && activeDayOnly > endDay));
            case "weekdays":
                return !!reminder.weekdays.at(((activeDay.getDay() + 6) % 7));
            case "interval":
                //console.log(reminder)
                return (start > activeDay)
                    ? false
                    : (reminder.intervalType === "hours")
                        ? (((activeDay - start) / msPerDay) % reminder.intervalValue === 0) && (activeDay <= end) //startUhrzeit fehlt, daran berechnen
                        : (reminder.intervalType === "days")
                            ? (endDay && activeDayOnly > endDay)
                                ? false
                                : (diffDays % reminder.intervalValue === 0)
                            : (reminder.intervalType === "weeks")
                                ? (endDay && activeDayOnly > endDay)
                                    ? false
                                    : (diffDays % (reminder.intervalValue * 7) === 0)
                                : (reminder.intervalType === "months")
                                    ? (endDay && activeDayOnly > endDay)
                                        ? false
                                        : (intervalMonthsValue && (monthsDiff % reminder.intervalValue === 0))
                                            ? (() => {
                                                const lastDayOfMonth = new Date(activeDay.getFullYear(), activeDay.getMonth() + 1, 0);
                                                const lastWeekdayOfMonth = lastDayOfMonth.getDay();
                                                const lastNrDayOfMonth = lastDayOfMonth.getDate();
                                                // const day = lastDayOfMonth.getDay();

                                                switch (reminder.intervalValueMonths) {
                                                    case "lastDay":
                                                        return activeDay.getDate() === lastNrDayOfMonth;
                                                    case "lastMonday":
                                                        const diff1 = (lastWeekdayOfMonth - 1 + 7) % 7; //letzter Montag im Monat
                                                        return activeDay.getDate() === (lastNrDayOfMonth - diff1);
                                                    case "lastTuesday":
                                                        const diff2 = (lastWeekdayOfMonth - 2 + 7) % 7; //letzter Dientag im Monat
                                                        return activeDay.getDate() === (lastNrDayOfMonth - diff2);
                                                    case "lastWednesday":
                                                        const diff3 = (lastWeekdayOfMonth - 3 + 7) % 7; //letzter Mittwoch im Monat
                                                        return activeDay.getDate() === (lastNrDayOfMonth - diff3);
                                                    case "lastThursday":
                                                        const diff4 = (lastWeekdayOfMonth - 4 + 7) % 7; //letzter Donnerstag im Monat
                                                        return activeDay.getDate() === (lastNrDayOfMonth - diff4);
                                                    case "lastFriday":
                                                        const diff5 = (lastWeekdayOfMonth - 5 + 7) % 7; //letzter Freitag im Monat
                                                        return activeDay.getDate() === (lastNrDayOfMonth - diff5);
                                                    case "lastSaturday":
                                                        const diff6 = (lastWeekdayOfMonth - 6 + 7) % 7; //letzter Samstag im Monat
                                                        return activeDay.getDate() === (lastNrDayOfMonth - diff6);
                                                    case "lastSunday":
                                                        const diff0 = (lastWeekdayOfMonth + 7) % 7; //letzter Sonntag im Monat
                                                        return activeDay.getDate() === (lastNrDayOfMonth - diff0);
                                                }
                                            })
                                            : (monthsDiff % reminder.intervalValue === 0)
                                                ? (activeDay.getDate() === start.getDate())
                                                    ? (!(endDay && activeDayOnly > endDay))
                                                    : false
                                                : false
                                    : false;
        }
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
                                className={`calendar__weekday-number ${activeDay.getDate() === day.getDate() ? "calendar__weekday-number--active" : ""}`}>
                                {day.getDate()}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div className="dashboard__content">
                {reminders
                    .filter(reminder => activeReminder(reminder))
                    .map((reminder, index) => {
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
            <NavigationBar/>
        </div>
    );
}

export default Dashboard;

//{reminders.map((reminder, index) => {
//                     reminder.showTime = true;
//                     if (index > 0) {
//                         reminder.showTime = reminder.time === reminders[index - 1].time ? null : reminder.time;
//                     }
//                     return (<TaskItem key={reminder.id} {...reminder} />)
//                 })
//                 }