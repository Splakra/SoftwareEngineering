import {back, quit} from "./utilities";

function NavigationButtons({title}) {

    return (
        <div>
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