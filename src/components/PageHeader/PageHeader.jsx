import {useNavigate} from "react-router-dom";
import "./PageHeader.css"
import ArrowIcon from "../../assets/arrow-left.svg";
import CrossIcon from "../../assets/cross.svg";

function PageHeader({title, quitPath}) {
    const navigate = useNavigate();

    function handleQuit() {
        navigate(quitPath ? quitPath : "/");
    }

    function handleBack() {
        navigate(-1);
    }

    return (
        <header className="page-header">
            <button className="page-header__back" onClick={handleBack}>
                <img alt="" className={"page-header__arrow"} src={ArrowIcon}/>
            </button>

            <p className="page-header__title">
                {title}
            </p>

            <button className="page-header__quit" onClick={handleQuit}>
                <img alt="" className={"page-header__cross"} src={CrossIcon}/>
            </button>
        </header>
    );
}

export default PageHeader;