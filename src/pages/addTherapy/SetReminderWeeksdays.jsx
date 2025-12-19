import './SetReminderWeekdays.css'
import {useGlobal} from "./GlobalContext";

export default function SetReminderWeekdays() {

    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const {weekday, setWeekday} = useGlobal();


    return <div>
        <div>Bestimmte Tage wählen</div>
        <div>
            {
                weekdays.map(
                    weekday => {
                        return <label className="weekdays">
                            <input type="checkbox" value={weekday} onChange={e => setWeekday(e.target.value)}/>
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