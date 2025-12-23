import {useNavigate} from "react-router";
import "./navigationButtons.css"

function NavigationButtons({title}) {
    const navigate = useNavigate();

    function quit() {
        navigate("/");
    }

    function back() {
        navigate(-1);
    }


    return (
        <div className="navigation-buttons">
            <button className={"back-button"} onClick={back}>
                Zurück
            </button>
            <div className={"page-title"}>
                {title}
            </div>
            <button className={"quit-button"} onClick={quit}>
                Verlassen
            </button>

        </div>

    );
}

export default NavigationButtons;