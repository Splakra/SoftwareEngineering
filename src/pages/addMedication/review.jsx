import './review.css';
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
        <div className="addName">
            <PageHeader title={medicationId ? "Medikament bearbeiten" : "Medikament hinzufügen"}
                        quitPath={"/medication"}/>

            <div className="query-wrapper">
                <div className={"addName__content"}>
                    Sind die Eingaben korrekt?
                </div>
                <div>
                    <div>
                        Name: {medicationName}
                    </div>
                    <div>
                        Art:
                        {(() => {
                            switch (medicationType) {
                                case"pills":
                                    return "Tabletten"

                                case"fluid":
                                    return "Flüssig (ml)"

                                case"drops":
                                    return "Tropfen"
                            }
                        })()}
                    </div>
                    <div>Aktueller Vorrat: {medicationStock} {(() => {
                        switch (medicationType) {
                            case"pills":
                                return "Tabletten"

                            case"fluid":
                                return "ml"

                            case"drops":
                                return "Tropfen"

                            default:
                                return ""
                        }
                    })()
                    } </div>
                    <div>
                        Erinnerung bei {medicationBuyNew} verbleibenden {(() => {
                        switch (medicationType) {
                            case"pills":
                                return "Tabletten"

                            case"fluid":
                                return "ml"

                            case"drops":
                                return "Tropfen"

                            default:
                                return ""
                        }
                    })()
                    }
                    </div>
                    <div>
                        Ablaufdatum: {medicationExpDate ? formatDate(medicationExpDate) : "Kein Ablaufdatum angegeben"}
                    </div>
                    <div>
                        Erinnerung an Ablaufen:
                        {(() => {
                            if (medicationExpiresValue) {
                                switch (medicationExpiresType) {
                                    case"days":
                                        return <span> {medicationExpiresValue} Tage vorher</span>

                                    case"weeks":
                                        return <span> {medicationExpiresValue} Wochen vorher</span>

                                    case"months":
                                        return <span>{medicationExpiresValue} Monate vorher</span>
                                }
                            } else {
                                return " Keine Erinnerung aktiviert"
                            }
                        })()
                        }
                    </div>
                </div>
            </div>
            <button onClick={nextPage}>
                {routeBackToChooseMedication ? 'Speichern & zurück zu "Einnahme hinzufügen"' : 'Speichern & Eingabe beenden'}
            </button>
        </div>
    );
}

export default review;