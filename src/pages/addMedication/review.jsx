import '../addTherapy/review.css';
import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "../globalContext";
import {formatDate} from "../dateFormat";

function review() {
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

    function getTypeLabel(type) {
        switch (type) {
            case "pills":
                return "Tabletten";
            case "fluid":
                return "Flüssig (ml)";
            case "drops":
                return "Tropfen";
            default:
                return "Sonstige";
        }
    }

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
            navigate("/addTherapy/medication");
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

            <div className="query-wrapper">
                <h2 className="title">Stimmt alles?</h2>

                <div className="review__table">
                    <div className="review__row">
                        <span className="review__label">Name</span>
                        <span className="review__value">{medicationName}</span>
                    </div>

                    <div className="review__row">
                        <span className="review__label">Art</span>
                        <span className="review__value">{getTypeLabel(medicationType)}</span>
                    </div>

                    <div className="review__row">
                        <span className="review__label">Vorrat</span>
                        <span className="review__value">
                            {medicationStock} {getTypeLabel(medicationType)}
                            <div className="review__sub">
                                Erinnerung: {medicationBuyNew
                                ? `${medicationBuyNew} ${getTypeLabel(medicationType)}`
                                : "Keine Erinnerung"}
                            </div>
                        </span>
                    </div>

                    <div className="review__row">
                        <span className="review__label">Ablaufdatum</span>
                        <span className="review__value">
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
                        </span>
                    </div>
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

export default review;