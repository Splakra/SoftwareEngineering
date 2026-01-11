import "./NavigationBar.css";
import {useNavigate} from "react-router";

export function NavigationBar() {
    const navigate = useNavigate();
    return (
        <div className={"navigationbar"}>
            <div>
                <button onClick={() => navigate("/")}>
                    Profile
                </button>
            </div>
            <div>
                <button onClick={() => navigate("/")}>
                    Dashboard
                </button>
            </div>
            <div>
                <button onClick={() => navigate("/medication")}>
                    Medis
                </button>
            </div>
        </div>)
}