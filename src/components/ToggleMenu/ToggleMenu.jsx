import {useState} from "react";
import "./ToggleMenu.css";
import OptionDots from '../../assets/option-dots.svg'
import PawIcon from "../../assets/paw.svg";


export default function ToggleMenu({items}) {
    const [open, setOpen] = useState(false);
    const handleOptions = (e) => {
        console.log("menu click");
        e.stopPropagation();
        setOpen(!open);
    }
    return (
        <div className={"toggle-menu"}>
            <button className={"toggle-menu__button"} onClick={() => setOpen(!open)}>
                <img alt="" className={"toggle-menu__dots"} src={OptionDots}/>

            </button>


            {open && (
                <div className={"toggle-menu__item"}>
                    {items.map((item) => (
                        <button className={"toggle-menu__item-button"} onClick={() => {
                            item.onClick();
                            setOpen(false);
                        }}>
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}