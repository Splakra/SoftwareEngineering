import Dexie from "dexie";

const db = new Dexie('MyDatabase');
db.version(1).stores({
    medications: '++id, name, type, amount, reminderBuyNew, expiration, reminderExpiration',
    reminders: '++id, medicationId, profileId, rhythm, startDate, endDate, time, dose, weekdays, interval',
    profiles: '++id, name'
});


export default db
