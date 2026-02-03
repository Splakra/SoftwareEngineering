import '../addTherapy/review.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../globalContext";
import { getDoseUnit, formatDate, getMedicationUnit } from "../../utils/therapyFormat";

function ReviewMedication() {
    const navigate = useNavigate();
    const {
        medicationName,
        medicationType,
        medicationStock,
        medicationBuyNew,
        medicationExpDate,
        medicationExpiresValue,
        medicationExpiresType,
        resetMedication,
        routeBackToChooseMedication,
        setRouteBackToChooseMedication,
        medicationId
    } = useGlobal();

    async function nextPage() {
        if (medicationId) {
            await db.medications.put({
                id: medicationId,
                name: medicationName,
                type: medicationType,
                amount: medicationStock,
                reminderBuyNew: medicationBuyNew,
                expiration: medicationExpDate,
                reminderExpirationValue: medicationExpiresValue,
                reminderExpirationType: medicationExpiresType
            })
        } else {
            await db.medications.add({
                name: medicationName,
                type: medicationType,
                amount: medicationStock,
                reminderBuyNew: medicationBuyNew,
                expiration: medicationExpDate,
                reminderExpirationValue: medicationExpiresValue,
                reminderExpirationType: medicationExpiresType

            })
        }
        resetMedication();
        if (routeBackToChooseMedication) {
            setRouteBackToChooseMedication(false)
            navigate("/addTherapy/medication", {viewTransition: true});
        } else {
            navigate("/medication");
        }
    }

    return (
        <div className="review page">
            <PageHeader
                title={medicationId ? "Medikament bearbeiten" : "Medikament hinzufügen"}
                quitPath="/medication"
            />
            <div className="view-transition-form">
                <div className="query-wrapper">
                    <h2 className="title">Stimmt alles?</h2>

                    <dl className="review__table">
                        <div className="review__row">
                            <dt className="review__label">Name</dt>
                            <dd className="review__value review__value--long">{medicationName}</dd>
                        </div>

                        <div className="review__row">
                            <dt className="review__label">Einheit</dt>
                            <dd className="review__value">{getDoseUnit(medicationType)}</dd>
                        </div>

                        <div className="review__row">
                            <dt className="review__label">Vorrat</dt>
                            <dd className="review__value">
                                {medicationStock} {getMedicationUnit(medicationType)}
                                <div className="review__sub">
                                    Erinnerung: {medicationBuyNew
                                    ? `${medicationBuyNew} ${getMedicationUnit(medicationType)}`
                                    : "Keine Erinnerung"}
                                </div>
                            </dd>
                        </div>

                        <div className="review__row">
                            <dt className="review__label">Ablaufdatum</dt>
                            <dd className="review__value">
                                {medicationExpDate ? formatDate(medicationExpDate) : "Kein Ablaufdatum"}
                                <div className="review__sub">
                                    Erinnerung: {medicationExpiresValue
                                    ? `${medicationExpiresValue} ${
                                        medicationExpiresType === "days"
                                            ? "Tage"
                                            : medicationExpiresType === "weeks"
                                                ? "Wochen"
                                                : "Monate"
                                    } vorher`
                                    : "Keine Erinnerung"}
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <button className="control button button-next" onClick={nextPage}>
                {routeBackToChooseMedication
                    ? 'Speichern & Fortfahren'
                    : 'Speichern'}
            </button>
        </div>
    );
}

export default ReviewMedication;