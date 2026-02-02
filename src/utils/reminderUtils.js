export function daysBetween(date1, date2) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const utcA = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utcB = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utcB - utcA) / msPerDay);
}

export function activeReminder(reminder, activeDay) {
    const start = new Date(reminder.startDate);
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate())
    const end = reminder.endDate ? new Date(reminder.endDate) : null;
    const endDay = end ? new Date(end.getFullYear(), end.getMonth(), end.getDate()) : null;
    const activeDayOnly = new Date(activeDay.getFullYear(), activeDay.getMonth(), activeDay.getDate());
    const intervalMonthsValue = reminder.intervalValueMonths ? reminder.intervalValueMonths : null;

    const monthsDiff = (activeDay.getFullYear() - start.getFullYear()) * 12 + (activeDay.getMonth() - start.getMonth());
    const diffDays = daysBetween(startDay, activeDayOnly); // startDay, activeDayOnly

    switch (reminder.rhythm) {
        case "daily":
            return (startDay > activeDayOnly)
                ? false
                : (!(endDay && activeDayOnly > endDay));
        case "weekdays":
            return !!reminder.weekdays?.[(activeDay.getDay() + 6) % 7]; // add ? so that it doesn't crash if weekdays is undefined
        case "interval":
            return (start > activeDay)
                ? false
                : (reminder.intervalType === "hours")
                    ? (!(endDay && activeDayOnly > endDay))
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
                                            const lastNrDayOfMonth = lastDayOfMonth.getDate();

                                            switch (reminder.intervalValueMonths) {
                                                case "lastDay":
                                                    return activeDay.getDate() === lastNrDayOfMonth;
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

export function compareTimes(a, b) {
    const [ha, ma] = a.split(":").map(Number);
    const [hb, mb] = b.split(":").map(Number);
    return ha === hb ? ma - mb : ha - hb;
}

export function getHourlyReminder(reminder, activeDay) {
    const hourlyReminders = [];

    const [year, month, day] = reminder.startDate.split("-").map(Number);
    const [hours, minutes] = reminder.intervalStartTime ? reminder.intervalStartTime.split(":").map(Number) : [0, 0];
    const interval = reminder.intervalValue;
    const start = new Date(year, month - 1, day, hours, minutes);
    const activeDayZero = new Date(activeDay.getFullYear(), activeDay.getMonth(), activeDay.getDate(), 0, 0, 0, 0);
    const activeDayEnd = new Date(activeDay.getFullYear(), activeDay.getMonth(), activeDay.getDate(), 23, 59, 59, 999);

    const intervalMs = interval * 60 * 60 * 1000;
    const diffMs = activeDayZero - start;
    const intervalsPassed = Math.max(0, Math.floor(diffMs / intervalMs));

    //erster möglicher reminder
    let current = new Date(start.getTime() + intervalsPassed * intervalMs);

    while (current < activeDayZero) {
        current = new Date(current.getTime() + intervalMs);
        // console.log(current)
    }

    while (current <= activeDayEnd) {
        hourlyReminders.push(current.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
        current = new Date(current.getTime() + intervalMs);
    }
    return hourlyReminders;
}

export function getSortedTimes(reminder, activeDay) {
    let timers = [];

    if (reminder.dailyTime) timers = [...reminder.dailyTime];
    if (reminder.weekdayTime) timers = [reminder.weekdayTime];

    if (reminder.intervalType === "hours" && reminder.rhythm === "interval") {
        timers = getHourlyReminder(reminder, activeDay);
    }

    timers = [...new Set(timers)];
    timers.sort(compareTimes);

    return timers;
}