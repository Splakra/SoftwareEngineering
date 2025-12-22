import PillIcon from "../../assets/pill.svg"
import DropIcon from "../../assets/drop.svg"
import SyringeIcon from "../../assets/syringe.svg"
import BottleIcon from "../../assets/bottle.svg"
import "./MedicineItem.css";

export default function MedicineItem({name, medicineType, storage, storageThreshold, expiration}) {
    const expDate = new Date(expiration);
    const expired = Date.now() > expDate.getTime();
    const empty = storage <= storageThreshold;
    const status = `${expired ? "Abgelaufen seit:" : "Läuft ab am:"} ${expDate.toLocaleDateString(navigator.language)}`;
    const storageText = `${storage} ${medicineType} übrig`;
    const medicineTypeIcon = medicineType === "ml" ? BottleIcon : medicineType === "Tropfen" ? DropIcon : PillIcon;
    // better object with key, value

    return (
        <div className={"medicine-item"}>
            <div className={"medicine-item__infos"}>
                <div className={"medicine-item__name"}>
                    {name}
                </div>
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