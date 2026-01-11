import Dexie from "dexie";

const db = new Dexie('MyDatabase');
db.version(1).stores({
    medications: '++id, name, type, amount, reminderBuyNew, expiration, reminderExpirationValue, reminderExpirationType',
    reminders: '++id, medicationId, profileId, rhythm, startDate, endDate, time, dose, weekdays, intervalType, intervalValue',
    profiles: '++id, name',
    done: '++id, reminderId, date, time'
});


export default db
