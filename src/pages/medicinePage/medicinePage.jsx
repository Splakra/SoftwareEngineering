import MedicineItem from '../../components/MedicineItem/MedicineItem';
import './medicinePage.css';
import {useEffect, useState} from "react";
import db from "../../database/DexieDatabase";
import {NavigationBar} from "../../components/NavigationBar/NavigationBar";
import PlusIcon from "../../assets/plus-icon.svg";
import {useNavigate, useRevalidator} from "react-router";
import {useGlobal} from "../globalContext";

function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}


export default function MedicinePage({meds = []}) {
    const shelves = chunkArray(meds, 2);
    const navigate = useNavigate();
    const {resetMedication} = useGlobal();

    const [medication, setMedication] = useState([])
    useEffect(() => {
        async function loadMedication() {
            const loadedMedication = await db.medications.toArray();
            setMedication(chunkArray(loadedMedication, 2));
        }

        loadMedication();
    }, [])

    async function addMed() {
        resetMedication();
        navigate("/addMedication/name");
    }


    return (
        <div className="medicine-page">
            <h2 className="medicine-page__title">
                Medikamenten-Schrank
            </h2>
            <div className="medicine-page__content">
                {medication.map((shelf, index) => (
                    <div className="medicine-shelf" key={index}>
                        <div className="medicine-shelf__items">
                            {shelf.map(medicine => (
                                <MedicineItem
                                    key={medicine.name}
                                    {...medicine}
                                />
                            ))}
                        </div>
                        <div className="medicine-shelf__board"/>
                    </div>
                ))}
                <button className={"medicine-page__add-button"} onClick={addMed}>
                    <img alt="" className={"medicine-page__plus-icon"} src={PlusIcon}/>
                    Hinzufügen
                </button>
            </div>

            <NavigationBar/>
        </div>
    );
}