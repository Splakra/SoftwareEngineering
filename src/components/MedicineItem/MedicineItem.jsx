import PillIcon from "../../assets/pill.svg"
import DropIcon from "../../assets/drop.svg"
import BottleIcon from "../../assets/bottle.svg"
import "./MedicineItem.css";
import db from "../../database/DexieDatabase";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import {useNavigate, useRevalidator} from "react-router";
import {useGlobal} from "../../pages/globalContext";


export default function MedicineItem({
                                         id,
                                         name,
                                         type,
                                         amount,
                                         reminderBuyNew,
                                         expiration,
                                         reminderExpirationValue,
                                         reminderExpirationType
                                     }) {
    const expDate = new Date(expiration);
    const expired = Date.now() > expDate.getTime();
    const empty = Number(amount) <= Number(reminderBuyNew);
    const status = `${expired ? "Abgelaufen seit:" : "Läuft ab am:"} ${expiration ? expDate.toLocaleDateString(navigator.language) : ""}`;
    const storageText = `${amount} ${type === "fluid" ? "ml" : type === "drops" ? "ml" : type === "pills" ? "Tabletten" : ""}`;
    const medicineTypeIcon = type === "fluid" ? BottleIcon : type === "drops" ? DropIcon : PillIcon;
    const navigate = useNavigate();
    const {setMedicationEdit} = useGlobal();

    async function deleteMedication() {
        await db.reminders.where("medicationId").equals(id).delete();
        await db.medications.delete(id);
        window.location.reload();
    }

    function editMedication() {
        setMedicationEdit({
            id,
            name,
            type,
            amount,
            reminderBuyNew,
            expiration,
            reminderExpirationValue,
            reminderExpirationType
        });
        navigate("/addMedication/name");
    }

    function addIntake() {
        navigate("/manualIntake/" + id);
    }

    return (
        <div className={"medicine-item"}>
            <div className={"medicine-item__infos"}>
                <div className={"medicine-item__name"}>
                    {name}
                </div>
                <ToggleMenu className="medicine-toggle"
                            items={[{
                                label: "Medikament mit zugehörigen Einnahmen löschen",
                                onClick: () => deleteMedication()
                            }, {
                                label: "Medikament bearbeiten",
                                onClick: () => editMedication()
                            }, {
                                label: "Einzelne Einnahme hinzufügen",
                                onClick: () => addIntake()
                            }]}/>
            </div>
            <div className={"medicine-item__details"}>
                <div className={`medicine-item__storage ${empty ? "medicine-item__storage--empty" : ""}`}>
                    <img alt="" className={"medicine-item__type"} src={medicineTypeIcon}/>
                    {storageText}
                </div>
                <div className={`medicine-item__status ${expired ? "medicine-item__status--expired" : ""}`}>
                    {status}
                </div>
            </div>
        </div>
    )
}