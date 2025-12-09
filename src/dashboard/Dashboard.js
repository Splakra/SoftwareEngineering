import './Dashboard.css';
import db from '../database/DexieDatabase.js';

function Dashboard() {
    const weekly = [-3, -2, -1, 0, 1, 2, 3].map(value => {
        const today = new Date();
        today.setDate(today.getDate() + value);
        return today;
    })
    const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const weekdaysLong = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    const currentDate = new Date();

    db.profiles.add({name: 'Sunny'})
    db.medication.add({name: 'Melosus', type: 'fluid', amount: 3.5, reminderBuyNew: 10})

    async function addIntake() {
        const medication = await db.medication.limit(1).toArray();
        const patient = await db.profiles.limit(1).toArray();
        db.intakeMeds.add({
            mediaction: medication[0].id,
            patient: patient[0].id,
            rythm: 'daily',
            startDate: currentDate
        })
    }

    return (
        <div>
            <div className="Calendar">
                <div className="Date">
                    {weekdaysLong[currentDate.getDay()] + ", " + currentDate.getDate() + ". " + months[currentDate.getMonth()]}
                </div>
                <div className="Week">
                    {
                        weekly.map(value => (
                            <div className="Weekday">
                                <div className="Days">
                                    {
                                        weekdays[value.getDay()]
                                    }
                                </div>
                                <div className="Number">
                                    {value.getDate()}
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