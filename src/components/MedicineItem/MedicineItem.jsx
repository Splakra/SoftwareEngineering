import PillIcon from "../../assets/pill.svg"
import DropIcon from "../../assets/drop.svg"
import SyringeIcon from "../../assets/syringe.svg"
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
    const empty = amount <= reminderBuyNew;
    const status = `${expired ? "Abgelaufen seit:" : "Läuft ab am:"} ${expiration ? expDate.toLocaleDateString(navigator.language) : ""}`;
    const storageText = `${amount} ${type == "fluid" ? "ml" : type == "drops" ? "ml" : type == "pills" ? "Tabletten" : ""} übrig`;
    const medicineTypeIcon = type === "fluid" ? BottleIcon : type === "drops" ? DropIcon : PillIcon;
    const navigate = useNavigate();
    const {setMedicationEdit} = useGlobal();

    // better object with key, value


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

    return (
        <div className={"medicine-item"}>
            <div className={"medicine-item__infos"}>
                <div className={"medicine-item__name"}>
                    {name}
                </div>
                <ToggleMenu
                    items={[{
                        label: "Dieses Medikament & alle zugehörigen Einnahmen löschen",
                        onClick: () => deleteMedication()
                    }, {
                        label: "Medikament bearbeiten",
                        onClick: () => editMedication()
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