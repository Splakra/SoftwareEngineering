import {useState} from "react";
import {useGlobal} from "./GlobalContext";

export default function SetReminderDaily() {
    const [times, setTimes] = useState([]);
    const {time, setTime, startDate, setStartDate, endDate, setEndDate,} = useGlobal();

    function addTime() {
        setTimes([...times, null]);
    }

    function removeTime(index) {
        setTimes(times.toSpliced(index, 1));
    }

    return <div>
        <div>
            <div>Startdatum</div>
            <input type="date" value={startDate}
                   onChange={e => setStartDate(e.target.value)}/> {/*pop up lässt sich möglicherweise nicht sytlen*/}
        </div>
        <div>
            <div>Enddatum</div>
            <input type="date" value={endDate}
                   onChange={e => setEndDate(e.target.value)}/> {/*pop up lässt sich möglicherweise nicht sytlen*/}
        </div>
        <div>
            <div>Uhrzeit hinzufügen</div>
            {
                times.map((time, index) => {
                    return (
                        <div>
                            <input type="time"/>
                            <button onClick={() => removeTime(index)}>
                                X
                            </button>
                        </div>
                    )
                })
            }
            <button onClick={addTime}>
                Hinzufügen
            </button>
        </div>
    </div>
}