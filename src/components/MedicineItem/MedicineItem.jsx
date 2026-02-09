import PillIcon from "../../assets/pill.svg"
import DropIcon from "../../assets/drop.svg"
import BottleIcon from "../../assets/bottle.svg"
import TrashIcon from "../../assets/trash.svg"
import PlusIconWhite from "../../assets/plus-icon-white.svg"
import PencilIcon from "../../assets/pencil.svg"
import "./MedicineItem.css";
import db from "../../database/DexieDatabase";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import {useNavigate, useRevalidator} from "react-router-dom";
import {useGlobal} from "../../pages/globalContext";
import {getMedicationUnit} from "../../utils/therapyFormat";
import * as medication from "@testing-library/user-event/dist/type";

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
    const navigate = useNavigate();
    const {setMedicationEdit} = useGlobal();
    const medicineTypeIcon =
        type === "fluid" ? BottleIcon
            : type === "drops" ? DropIcon
                : PillIcon;

    function formatStock(value) {
        if (value === null || value === undefined || value === "") return "";
        const num = Number(value);
        if (Number.isNaN(num)) return value;
        const [intPart, decPart] = String(value).replace(",", ".").split(".");
        if (!decPart || decPart.length === 0) {
            return intPart;
        }
        if (decPart.length <= 2) {
            return `${intPart}.${decPart}`;
        }
        return num.toFixed(2);
    }

    const storageText = `${formatStock(amount)} ${getMedicationUnit(type)}`;
    const empty = Number(amount) <= Number(reminderBuyNew);
    const expDate = new Date(expiration);
    const expired = Date.now() > expDate.getTime();
    const status =
        expiration ? `${expired ? "Abgelaufen seit:" : "Läuft ab am:"} ${expDate.toLocaleDateString(navigator.language)}`
            : "Kein Ablaufdatum";

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
                                label: "Einzelne Einnahme hinzufügen",
                                icon: PlusIconWhite,
                                onClick: () => addIntake()
                            }, {
                                label: "Medikament bearbeiten",
                                icon: PencilIcon,
                                onClick: () => editMedication()
                            }, {
                                label: "Medikament löschen", // Achtung: Löscht alle zugehörigen Erinnerungen!
                                icon: TrashIcon,
                                onClick: () => deleteMedication()
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
};