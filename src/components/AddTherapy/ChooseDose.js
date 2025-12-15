//back & quit auslagern für alle verfügbar
import './ChooseDose.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";

function ChooseDose() {

    const [dosageForm, setDosageForm] = useState("fluid")

    return <div>
        <NavigationButtons title="Einnahme hinzufügen"/>
        <div className={"choose-dose_heading"}>
            In welcher Dosis soll das Medikament verabreicht werden?
        </div>
        <div className="input-line">
            <input type="number"/>
            <div>{(() => {
                switch (dosageForm) {
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

        <button>
            Weiter
        </button>

    </div>;
}

export default ChooseDose;