import "./NavigationBar.css";
import {useLocation, useNavigate} from "react-router-dom";
import CalendarIcon from "../Icons/CalendarIcon";
import PawIcon from "../Icons/PawIcon";
import Medication from "../Icons/Medication";
import PlusIcon from "../Icons/PlusIcon";

export function NavigationBar({onPlusClick}) {
    const navigate = useNavigate();
    const location = useLocation(); // aktuelle Route

    return (
        <div className="navigation">
            <div className="navigation__buttons">
                <button
                    className={`navigation__button ${location.pathname === "/" ? "active" : ""}`}
                    onClick={() => navigate("/", {viewTransition: true})}>
                    <CalendarIcon className="navigation__button-icon"/>
                </button>
                <button
                    className={`navigation__button ${location.pathname === "/medication" ? "active" : ""}`}
                    onClick={() => navigate("/medication", {viewTransition: true})}>
                    <Medication className="navigation__button-icon"/>
                </button>
                <button
                    className={`navigation__button ${location.pathname === "/profile" ? "active" : ""}`}
                    onClick={() => navigate("/profile", {viewTransition: true})}>
                    <PawIcon className="navigation__button-icon"/>
                </button>
            </div>
            {/* Plus Button */}
            <button
                className="navigation__plus"
                onClick={onPlusClick}>
                <PlusIcon className="navigation__plus-icon"/>
            </button>
        </div>
    )
}