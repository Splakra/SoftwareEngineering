import './setReminder.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import SetReminderInterval from "./setReminderInterval";
import SetReminderWeekdays from "./setReminderWeeksdays";
import SetReminderDaily from "./setReminderDaily";
import {useNavigate} from "react-router";
import {useGlobal} from "../globalContext";

function SetReminder() {
    const navigate = useNavigate();
    const {
        therapyRhythm, setTherapyRhythm,
        therapyTime, therapyIntervalValue,
        therapyWeekday, therapyStartDate, setTherapyStartDate,
        therapyEndDate, setTherapyEndDate
    } = useGlobal();

    function nextPage() {
        navigate("/addTherapy/review");
    }

    const isButtonDisabled = () => {
        switch (therapyRhythm) {
            case "daily":
                // return time.length === 0 || therapyTime.some(t => t === "");
                return !therapyTime.every(t => t);
            case "weekdays":
                return !therapyWeekday.some(v => v);
            case "interval":
                return !therapyIntervalValue;
            default:
                return true;
        }
    };

    const renderRhythm = () => {
        switch (therapyRhythm) {
            case "daily":
                return <SetReminderDaily/>;
            case "weekdays":
                return <SetReminderWeekdays/>;
            case "interval":
                return <SetReminderInterval/>;
            default:
                return null;
        }
    };

    return (
        <div className="page">
            <PageHeader title="Einnahme hinzufügen"/>

            <h2 className="title">
                Wann möchtest du erinnert werden?
            </h2>

            <section className="set-reminder__section">
                <div className="set-reminder__rhythm">
                    <label htmlFor="rhythmSelect">
                        Rhythmus auswählen
                    </label>
                    <div className="select-wrapper">
                        <select
                            className={`control select ${
                                therapyRhythm === "" || therapyRhythm == null ? "is-placeholder" : ""
                            }`}
                            id="rhythmSelect"
                            value={therapyRhythm ?? ""}
                            onChange={e => setTherapyRhythm(e.target.value)}
                        >
                            <option value="daily">Jeden Tag</option>
                            <option value="weekdays">Bestimmte Wochentage</option>
                            <option value="interval">Intervall</option>
                        </select>
                    </div>
                </div>

                <div className="set-reminder__dates">
                    <label>
                        Startdatum
                        <input
                            type="date"
                            className="control select date"
                            value={therapyStartDate ?? ""}
                            onChange={e => setTherapyStartDate(e.target.value)}
                        />
                    </label>

                    <label>
                        Enddatum
                        <input
                            type="date"
                            className="control select date"
                            value={therapyEndDate ?? ""}
                            onChange={e => setTherapyEndDate(e.target.value)}
                        />
                    </label>
                </div>

                <div className="set-reminder__details">
                    {renderRhythm()}
                </div>
            </section>

            <button
                className="control button button-next"
                disabled={isButtonDisabled()}
                onClick={nextPage}
            >
                Weiter
            </button>
        </div>
    );
}

export default SetReminder;

//Jeden Tag: Startdatum: Datumsauwahl // Enddatum: Datumsauswahl // Uhrzeit auswählen: Uhrzeit Auswahl
//Bestimmte Wochentage: Wochentage werden Displayed, auswahl (färbt sich wenn angetippt), Uhrzeit
//Intervall: Rythmus wählen: Alle ____ Dropdown(Minuten, Stunden, Tage, Wochen [Stunden als StandardAngabe])