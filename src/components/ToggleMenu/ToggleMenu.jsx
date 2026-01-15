import {useState} from "react";
import "./ToggleMenu.css";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";

export default function ToggleMenu({items, className = ""}) {
    const [open, setOpen] = useState(false);

    const handleToggle = (e) => {
        e.stopPropagation(); // Prevents clicking on the button from triggering other actions.
        setOpen(!open);
    };

    const handleClose = (e) => {
        e?.stopPropagation();
        setOpen(false);
    }

    return (
        <div className={`toggle-menu ${className}`}>
            <button className="toggle-menu__button" onClick={handleToggle}>
                <ThreeDotsIcon className="toggle-menu__dots"/>
            </button>

            {open && (
                <>
                    {/* Dark background */}
                    <div className="toggle-menu__backdrop" onClick={handleClose}></div>

                    {/* Bottom Sheet */}
                    <div className="toggle-menu__sheet" onClick={(e) => e.stopPropagation()}>
                        <div className="toggle-menu__sheet-content">
                            {items.map((item, i) => (
                                <button
                                    key={i}
                                    className="toggle-menu__sheet-item"
                                    onClick={() => {
                                        item.onClick();
                                        handleClose();
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}

                            <button className="toggle-menu__sheet-cancel" onClick={handleClose}>
                                Abbrechen
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
