//import db from '../database/DexieDatabase.js';

import db from "../../database/DexieDatabase";
import {useNavigate} from "react-router";

export default function NewProfile ()
{
    const navigate = useNavigate();


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

    function handleClick () {
        navigate("/");
    }

    return(
        <form method = "send" onSubmit={handleSubmit}>
            <div>
                <h1> "Wie heißt dein/e Patient/in?" </h1>
                <label>
                    <p> Name eingeben </p>
                    <textarea name="patientName"  cols="30" rows="1" />
                </label>
                <button  type="submit" onClick={handleClick}> Speichern </button>
            </div>
        </form>
    )
}