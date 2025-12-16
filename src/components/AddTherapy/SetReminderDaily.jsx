import {useState} from "react";

export default function SetReminderDaily() {
    const [times, setTimes] = useState([]);

    function addTime() {
        setTimes([...times, null]);
    }

    function removeTime(index) {

        setTimes(times.toSpliced(index, 1));
    }

    return <div>
        <div>
            <div>Startdatum</div>
            <input type="date"/> {/*pop up lässt sich möglicherweise nicht sytlen*/}
        </div>
        <div>
            <div>Enddatum</div>
            <input type="date"/> {/*pop up lässt sich möglicherweise nicht sytlen*/}
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