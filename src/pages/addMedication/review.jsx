import './review.css';
import NavigationButtons from "../../components/NavigationButtons/NavigationButtons";
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
        resetMedication
    } = useGlobal();

    async function nextPage() {
        await db.medications.add({
            name: medicationName,
            type: medicationType,
            amount: medicationStock,
            reminderBuyNew: medicationBuyNew,
            expiration: medicationExpDate,
            reminderExpirationValue: medicationExpiresValue,
            reminderExpirationType: medicationExpiresType,

        })
        resetMedication();

        navigate("/addMedication/name")
    }


    return (
        <div className="addName">
            <NavigationButtons title="Medikament hinzufügen" quitPath={"/medication"}/>
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
            <button onClick={nextPage}>
                Speichern & Eingabe beenden
            </button>
        </div>
    );
}

export default review;