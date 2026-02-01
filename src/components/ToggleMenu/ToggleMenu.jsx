import {useState} from "react";
import "./ToggleMenu.css";
import ThreeDotsIcon from "../Icons/ThreeDotsIcon";

export default function ToggleMenu({items, className = ""}) {
    const [open, setOpen] = useState(false);

    const handleToggle = (e) => {
        e.stopPropagation(); // prevents clicking on the button from triggering other actions.
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
                            <div className="toggle-menu__title">
                                Optionen
                            </div>
                            {items.map((item, i) => (
                                <button
                                    key={i}
                                    className="toggle-menu__sheet-item"
                                    onClick={() => {
                                        item.onClick();
                                        handleClose();
                                    }}
                                >
                                    {item.icon && (
                                        <img
                                            src={item.icon}
                                            alt=""
                                            className="toggle-menu__sheet-item-icon"
                                        />
                                    )}
                                    <span className="toggle-menu__sheet-item-label">
                                    {item.label}
                                    </span>
                                </button>
                            ))}

                            <button className="control button toggle-menu__sheet-cancel" onClick={handleClose}>
                                Abbrechen
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
