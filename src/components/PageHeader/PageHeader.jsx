import {useNavigate} from "react-router";
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
            <div className="page-header__back" onClick={handleBack}>
                <img alt="" className={"page-header__arrow"} src={ArrowIcon}/>
            </div>

            <p className="page-header__title">
                {title}
            </p>

            <div className="page-header__quit" onClick={handleQuit}>
                <img alt="" className={"page-header__cross"} src={CrossIcon}/>
            </div>
        </header>
    );
}

export default PageHeader;