import PageHeader from "../../components/PageHeader/PageHeader";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import db from "../../database/DexieDatabase";

export default function manualIntake() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState();
    const {id} = useParams();

    const [medication, setMedication] = useState()
    useEffect(() => {
        async function loadMedication() {
            const loadedMedication = await db.medications.where("id").equals(Number.parseInt(id)).first();
            setMedication(loadedMedication);
        }

        loadMedication();
    }, [])


    async function nextPage() {
        await db.medications.update(Number.parseInt(id), {amount: medication?.amount - Number.parseFloat(amount)})
        navigate("/medication")
    }


    return (
        <div className="addStock">
            <PageHeader title={"Einzelgabe hinzufügen"}
                        quitPath={"/medication"}/>
            <div className={"addStock__content"}>
                Wie viel wurde verabreicht?
            </div>
            <div>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)}/>
                <div>{(() => {
                    switch (medication?.type) {
                        case"pills":
                            return "Tabletten"

                        case"fluid":
                            return "ml"

                        case"drops":
                            return "ml"
                    }
                })()}</div>
            </div>

            <button onClick={nextPage} disabled={!amount}>
                Speichern & Beenden
            </button>
        </div>
    );
}