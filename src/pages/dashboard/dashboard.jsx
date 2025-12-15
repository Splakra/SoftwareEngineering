import './dashboard.css';
import db from '../../database/DexieDatabase.js';

// for later:
// export async function clientLoader() {
//     // you can now fetch data here
//     return {
//         title: "Dashboard",
//     };
// }

function Dashboard({loaderData}) {
    const weekly = [-3, -2, -1, 0, 1, 2, 3].map(value => {
        const today = new Date();
        today.setDate(today.getDate() + value);
        return today;
    })
    const currentDate = new Date();

    db.profiles.add({name: 'Sunny'})
    db.medication.add({name: 'Melosus', type: 'fluid', amount: 3.5, reminderBuyNew: 10})

    async function addIntake() {
        const medication = await db.medication.limit(1).toArray();
        const patient = await db.profiles.limit(1).toArray();
        db.intakeMeds.add({
            medication: medication[0].id,
            patient: patient[0].id,
            rhythm: 'daily',
            startDate: currentDate
        })
    }

    return (
        <div>
            <div className="Calendar">
                <div className="Date">
                    {currentDate.toLocaleDateString("de-DE", {weekday: "long", month: "long", day: "numeric"})}
                </div>
                <div className="Week">
                    {
                        weekly.map(day => (
                            <div className="Weekday">
                                <div className="Days">
                                    {day.toLocaleDateString("de-DE", {weekday: "short"})}
                                </div>
                                <div className="Number">
                                    {day.getDate()}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button onClick={addIntake}>
                Einnahme hinzufügen
            </button>


        </div>
    );
}

export default Dashboard;