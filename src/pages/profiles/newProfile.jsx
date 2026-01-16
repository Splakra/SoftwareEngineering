//import db from '../database/DexieDatabase.js';

import db from "../../database/DexieDatabase";
import PageHeader from "../../components/PageHeader/PageHeader";
import {useNavigate} from "react-router";
import {useGlobal} from "../globalContext";

export default function NewProfile() {
    const navigate = useNavigate();
    const {routeBackToChooseProfile, setRouteBackToChooseProfile} = useGlobal();

    function handleSubmit(input) {
        input.preventDefault();

        //read the form data
        const form = input.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        db.profiles.add({name: formJson.patientName});
        //alert(formJson.patientName); //test

    }

    function handleClick() {
        if (routeBackToChooseProfile) {
            setRouteBackToChooseProfile(false);
            navigate("/addTherapy/profile");
        } else {
            navigate("/profile");
        }
    }

    return (
        <div>
            <PageHeader title="einnahme hinzufügen"
                        quitPath={"/profile"}/>
            <form method="send" onSubmit={handleSubmit}>
                <div>
                    <h1> "Wie heißt dein/e Patient/in?" </h1>
                    <label>
                        <p> Name eingeben </p>
                        <textarea name="patientName" cols="30" rows="1"/>
                    </label>
                    <button type="submit" onClick={handleClick}> Speichern</button>
                </div>
            </form>
        </div>
    )
}