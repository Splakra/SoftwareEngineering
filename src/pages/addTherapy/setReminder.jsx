import './setReminder.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import SetReminderInterval from "./setReminderInterval";
import SetReminderWeekdays from "./setReminderWeeksdays";
import SetReminderDaily from "./setReminderDaily";
import {useNavigate} from "react-router-dom";
import {useGlobal} from "../globalContext";

function SetReminder() {
    const navigate = useNavigate();
    const {
        therapyRhythm, setTherapyRhythm,
        therapyDailyTime, therapyIntervalValue,
        therapyWeekday, therapyWeekdayTime, therapyStartDate, setTherapyStartDate,
        therapyEndDate, setTherapyEndDate,
        therapyIntervalHoursStartTime, therapyIntervalType
    } = useGlobal();

    function nextPage() {
        navigate("/addTherapy/review", {viewTransition: true});
    }

    const isEndDateBeforeStartDate = () => therapyEndDate === null ? false : new Date(therapyStartDate).getTime() > new Date(therapyEndDate).getTime();
    const isButtonDisabled = () => {
        if (isEndDateBeforeStartDate()) {
            return true;
        }
        switch (therapyRhythm) {
            case "daily":
                return therapyDailyTime.some(t => t === "");
            case "weekdays":
                return !therapyWeekday.some(v => v); // || !therapyWeekdayTime;
            case "interval":
                return !therapyIntervalValue || (!therapyIntervalHoursStartTime && therapyIntervalType === "hours");
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
        <div className="set-reminder page">
            <PageHeader title="Einnahme hinzufügen"/>

            <div className="view-transition-form">
                <div className="query-wrapper">
                    <h2 className="title">
                        Wann möchtest du erinnert werden?
                    </h2>

                    <div className="set-reminder__rhythm">
                        <label
                            htmlFor="rhythmSelect">
                            Rhythmus wählen
                        </label>
                        <div className="select-wrapper">
                            <select
                                className={`control select ${therapyRhythm === "" || therapyRhythm == null ? "is-placeholder" : ""}`}
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
                </div>

                <div className="set-reminder__dates">
                    <div className="set-reminder__date-wrapper">
                        <label>
                            Startdatum
                        </label>
                        <div className="set-reminder__date-input-wrapper">
                            <input
                                type="date"
                                id="startDate"
                                className="date set-reminder__date"
                                value={therapyStartDate ?? ""}
                                onChange={e => setTherapyStartDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="set-reminder__date-wrapper">
                        <div className="set-reminder__date-label">
                            <label>
                                Enddatum
                            </label>
                            <span className="optional optional--small">optional</span>
                        </div>

                        <div className="set-reminder__date-input-wrapper">
                            <input
                                type="date"
                                id="endDate"
                                className="date set-reminder__date"
                                value={therapyEndDate ?? ""}
                                onChange={e => setTherapyEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    {therapyEndDate && isEndDateBeforeStartDate() && (
                        <div className="warning">
                            Enddatum liegt vor dem Startdatum!
                        </div>
                    )}
                </div>

                <div className="set-reminder__details">
                    {renderRhythm()}
                </div>
            </div>

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