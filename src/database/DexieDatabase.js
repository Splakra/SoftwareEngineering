import Dexie from "dexie";

var db = new Dexie('MyDatabase');
db.version(1).stores({
    medication: '++id, name, type, amount, reminderBuyNew, expiration, reminderExpiration',
    intakeMeds: '++id, medication, patient, rythm, startDate, endDate, time, dose, weekdays, interval',
    profiles: '++id, name'
});


export default db
