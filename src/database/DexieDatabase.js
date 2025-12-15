import Dexie from "dexie";

var db = new Dexie('MyDatabase');
db.version(1).stores({
    medication: '++id, name, type, amount, reminderBuyNew, expiration, reminderExpiration',
    intakeMeds: '++id, medication, patient, rhythm, startDate, endDate, time, dose, weekdays, interval',
    // reminders: ..., medicationId, patientId, ...
    profiles: '++id, name'
    // profileS/medicationS/reminderS - either plural or singular, not mixed
});


export default db
