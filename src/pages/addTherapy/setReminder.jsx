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
        rhythm, setRhythm,
        time, intervalValue,
        weekday, startDate, setStartDate,
        endDate, setEndDate
    } = useGlobal();

    function nextPage() {
        navigate("/addTherapy/review");
    }

    const isButtonDisabled = () => {
        switch (rhythm) {
            case "daily":
                return !time.every(t => t);
            case "weekdays":
                return !weekday.some(v => v);
            case "interval":
                return !intervalValue;
            default:
                return true;
        }
    };

    const renderRhythm = () => {
        switch (rhythm) {
            case "daily":
                return <SetReminderDaily/>;
            case "weekdays":
                return <SetReminderWeekdays/>;
            case "interval":
                return <SetReminderInterval/>;
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
                                rhythm === "" || rhythm == null ? "is-placeholder" : ""
                            }`}
                            id="rhythmSelect"
                            value={rhythm ?? ""}
                            onChange={e => setRhythm(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Glitzerheilstaub
                            </option>
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
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </label>

                    <label>
                        Enddatum
                        <input
                            type="date"
                            className="control select date"
                            value={endDate ?? ""}
                            onChange={e => setEndDate(e.target.value)}
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