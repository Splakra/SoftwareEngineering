//back & quit auslagern für alle verfügbar
import './ChooseDose.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "./GlobalContext";


function ChooseDose() {
    const navigate = useNavigate();
    const {medication, dose, setDose} = useGlobal();

    async function nextPage() {
        navigate("/addTherapy/reminder")
    }

    return <div>
        <NavigationButtons title="Einnahme hinzufügen"/>
        <div className={"choose-dose_heading"}>
            In welcher Dosis soll das Medikament verabreicht werden?
        </div>
        <div className="input-line">
            <input type="number" onChange={e => setDose(e.target.value)} value={dose}/>

            <div>{(() => {
                switch (JSON.parse(medication).type) {
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
        </div>

        <button onClick={nextPage} disabled={!dose}>
            Weiter
        </button>

    </div>;
}

export default ChooseDose;