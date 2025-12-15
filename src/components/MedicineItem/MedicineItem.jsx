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
    const longName = getTextWidth(name, "bold 25px Ysabeau Office") > window.document.body.offsetWidth - 200

    function getTextWidth(text, font) {
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        const context = canvas.getContext("2d");
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }

    return (
        <div className={`medicine-item ${expired || empty ? "medicine-item--allert" : ""}`}>
            <button className={"medicine-item__button"}>
                <div className={"medicine-item__infos"}>
                    <div className={`medicine-item__name ${longName ? "sideScrollAnim" : ""}`}>
                        <img alt="" className={"medicine-item__pill"} src={medicineTypeIcon}/>
                        <div>{name}</div>
                    </div>
                    <div className={"medicine-item__storage"}>
                        {storageText}
                    </div>
                    <div className={"medicine-item__status"}>
                        {status}
                    </div>
                </div>
            </button>
        </div>
    )
}