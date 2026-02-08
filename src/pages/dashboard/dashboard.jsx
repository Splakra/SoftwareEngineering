import './dashboard.css';
import db from '../../database/DexieDatabase.js';
import { useEffect, useState } from "react";
import TaskItem from "../../components/TaskItem/TaskItem";
import { NavigationBar } from "../../components/NavigationBar/NavigationBar";
import { useGlobal } from "../globalContext";
import { activeReminder, getSortedTimes, compareTimes } from "../../utils/reminderUtils";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export async function clientLoader({ request }) {

    return {
        reminders,
        date
    };
}

const systemDate = new Date();
systemDate.setHours(12, 0, 0, 0)

function Dashboard() {
    const [reminders, setReminders] = useState([]);

    const [search, setSearch] = useSearchParams();
    const query = new URLSearchParams(search);
    const date = query.get("date") ?? systemDate.toISOString().split("T")[0];


    useEffect(() => {
        async function dataLoader() {
            const loadedReminders = await db.reminders.orderBy("dailyTime").toArray(); // get all reminders

            await Promise.all( // wait until all async functions inside the parenthesis are done
                loadedReminders.map(async (reminder) => {
                    [reminder.medication, reminder.patient, reminder.done] = await Promise.all(
                        [
                            db.medications.where({ id: reminder.medicationId }).first(), // .first(): get first as object, not as array like in .limit(1)
                            db.profiles.where({ id: reminder.profileId }).first(),
                            db.done.where({ reminderId: reminder.id }).and((done) => done.date === date).toArray()
                        ]
                    )
                })
            )
            setReminders(loadedReminders)
        }

        dataLoader();
    }, [search])

    const weekly = [-2, -1, 0, 1, 2].map(value => {
        const today = new Date();
        today.setHours(12, 0, 0, 0);
        today.setDate(today.getDate() + value);
        return today;
    })
    const currentDate = new Date(date);
    const navigate = useNavigate();

    const { resetTherapy } = useGlobal();

    function addIntake() {
        resetTherapy();
        navigate("/addTherapy/profile")
    }

    const [activeDay, setActiveDay] = useState(currentDate);

    function handleDayClick(day) {
        setActiveDay(day);
        setSearch({ date: day.toISOString().split("T")[0] }, { viewTransition: true })
    }

    return (
        <div className={"dashboard page-full"}>
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
                                {day.toLocaleDateString("de-DE", { weekday: "short" })}
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
                <div className="view-transition-task-items">
                    {(() => {
                        const allTasks = reminders
                            .filter(reminder => activeReminder(reminder, activeDay))
                            .flatMap(reminder => {
                                const times = getSortedTimes(reminder, activeDay);
                                return times.map(time => ({
                                    reminder,
                                    time
                                }));
                            });
                        allTasks.sort((a, b) => compareTimes(a.time, b.time));

                        let lastTime = null;

                        return allTasks.map(({ reminder, time }) => {
                            if (!time) {
                                time = "Ohne Zeit";
                            }
                            if (time === lastTime) {
                                time = null;
                            }
                            lastTime = time;

                            const date = activeDay.toISOString().split("T")[0];
                            return (
                                <TaskItem
                                    key={`${reminder.id}-${date}-${time}`}
                                    {...reminder}
                                    time={time}
                                    date={date}
                                />
                            );
                        });
                    })()}
                </div>
            </div>
            <NavigationBar onPlusClick={addIntake} />
        </div>
    );
}

export default Dashboard;