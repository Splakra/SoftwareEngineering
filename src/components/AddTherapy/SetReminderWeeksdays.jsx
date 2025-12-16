import './SetReminderWeekdays.css'

export default function SetReminderWeekdays() {

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];


    return <div>
        <div>Bestimmte Tage wählen</div>
        <div>
            {
                weekdays.map(
                    weekday => {
                        return <label className="weekdays">
                            <input type="checkbox"/>
                            <span className="weekdays_span">
                                {weekday}
                            </span>
                        </label>
                    }
                )
            }
        </div>
    </div>
}