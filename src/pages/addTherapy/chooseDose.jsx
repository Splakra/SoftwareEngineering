//back & quit auslagern für alle verfügbar
import './ChooseDose.css';
import NavigationButtons from "./NavigationButtons";
import db from "../../database/DexieDatabase";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useGlobal} from "./GlobalContext";

function ChooseDose() {
    const navigate = useNavigate();
    const {dose, setDose} = useGlobal();

    async function nextPage() {
        navigate("/addTherapy/reminder")
    }

    const [dosageForm, setDosageForm] = useState("fluid")

    return <div>
        <NavigationButtons title="Einnahme hinzufügen"/>
        <div className={"choose-dose_heading"}>
            In welcher Dosis soll das Medikament verabreicht werden?
        </div>
        <div className="input-line">
            <input type="number" onChange={e => setDose(e.target.value)} value={dose}/>
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

        <button onClick={nextPage}>
            Weiter
        </button>

    </div>;
}

export default ChooseDose;