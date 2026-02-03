import './review.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../globalContext";
import SetReminderDaily from "./setReminderDaily";
import SetReminderWeekdays from "./setReminderWeeksdays";
import SetReminderInterval from "./setReminderInterval";
import {
    formatDate,
    formatInterval,
    formatTimes,
    formatWeekdays,
    getDoseUnit,
} from "../../utils/therapyFormat";

export default function ReviewTherapy() {
    const navigate = useNavigate();

    const {
        therapyProfile,
        therapyMedication,
        therapyDose,
        therapyRhythm,
        therapyStartDate,
        therapyEndDate,
        therapyDailyTime,
        therapyWeekday,
        therapyWeekdayTime,
        therapyIntervalType,
        therapyIntervalValue,
        therapyIntervalMonths,
        therapyIntervalHoursStartTime,
        resetTherapy
    } = useGlobal();

    const parsedProfile = therapyProfile ? JSON.parse(therapyProfile) : null;
    const parsedMedication = therapyMedication ? JSON.parse(therapyMedication) : null;

    const rhythmLabel = {
        daily: "Jeden Tag",
        weekdays: "Bestimmte Wochentage",
        interval: "Intervall"
    }[therapyRhythm];

    async function nextPage() {
        await db.reminders.add({
            medicationId: JSON.parse(therapyMedication).id,
            profileId: JSON.parse(therapyProfile).id,
            rhythm: therapyRhythm,
            startDate: therapyStartDate,
            endDate: therapyEndDate,
            dailyTime: therapyDailyTime,
            dose: therapyDose,
            weekdays: therapyWeekday,
            weekdayTime: therapyWeekdayTime,
            intervalType: therapyIntervalType,
            intervalValue: therapyIntervalValue,
            intervalValueMonths: therapyIntervalMonths,
            intervalStartTime: therapyIntervalHoursStartTime
        })
        resetTherapy();
        navigate("/")
    }

    return (
        <div className={"review page"}>
            <PageHeader title="Einnahme hinzufügen" />

            <div className="view-transition-form">
                <div className="query-wrapper">
                    <h2 className="title">
                        Stimmt alles?
                    </h2>

                    <dl className="review__table">
                        <div className="review__row">
                            <dt className="review__label">Profil</dt>
                            <dd className="review__value review__value--long">{parsedProfile?.name}</dd>
                        </div>
                        <div className="review__row">
                            <dt className="review__label">Medikament</dt>
                            <dd className="review__value review__value--long">{parsedMedication?.name}</dd>
                        </div>
                        <div className="review__row">
                            <dt className="review__label">Dosis</dt>
                            <dd className="review__value">{therapyDose} {getDoseUnit(parsedMedication?.type)}</dd>
                        </div>
                        <div className="review__row">
                            <dt className="review__label">Startdatum</dt>
                            <dd className="review__value">{formatDate(therapyStartDate)}</dd>
                        </div>
                        <div className="review__row">
                            <dt className="review__label">Enddatum</dt>
                            <dd className="review__value">{therapyEndDate ? formatDate(therapyEndDate) : "Kein Enddatum"}</dd>
                        </div>
                        <div className="review__row">
                            <dt className="review__label">Rhythmus</dt>
                            <dd className="review__value">{rhythmLabel}</dd>
                        </div>

                        {therapyRhythm === "daily" && (
                            <div className="review__row">
                                <dt className="review__label">Uhrzeit</dt>
                                <dd className="review__value">{formatTimes(therapyDailyTime)}</dd>
                            </div>
                        )}

                        {therapyRhythm === "weekdays" && (
                            <>
                                <div className="review__row">
                                    <dt className="review__label">Wochentage</dt>
                                    <dd className="review__value">
                                        {formatWeekdays(therapyWeekday)}
                                    </dd>
                                </div>
                                {therapyWeekdayTime && (
                                    <div className="review__row">
                                        <dt className="review__label">Uhrzeit</dt>
                                        <dd className="review__value">{therapyWeekdayTime}</dd>
                                    </div>
                                )}
                            </>
                        )}

                        {therapyRhythm === "interval" && (
                            <div className="review__row">
                                <dt className="review__label">Intervall</dt>
                                <dd className="review__value">
                                    {formatInterval({
                                        intervalValue: therapyIntervalValue,
                                        intervalType: therapyIntervalType,
                                        intervalStartTime: therapyIntervalHoursStartTime
                                    })}
                                </dd>
                            </div>
                        )}
                    </dl>
                </div>
            </div>

            <button
                className={"control button button-next"}
                onClick={nextPage}>
                Speichern
            </button>
        </div>
    );
}
