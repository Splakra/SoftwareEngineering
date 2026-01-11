import {createContext, useContext, useState} from "react";

const GlobalContext = createContext({});

export function GlobalProvider({children}) {
    //addTherapy
    const [profile, setProfile] = useState();
    const [medication, setMedication] = useState();
    const [dose, setDose] = useState();
    const [rhythm, setRhythm] = useState("daily");
    const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState();
    const [time, setTime] = useState([null]);
    const [weekday, setWeekday] = useState([false, false, false, false, false, false, false]);
    const [intervalType, setIntervalType] = useState("hours");
    const [intervalValue, setIntervalValue] = useState();

    const [routeBackToChooseMedication, setRouteBackToChooseMedication] = useState(false);

    //addMedication
    const [medicationId, setMedicationId] = useState();
    const [medicationName, setMedicationName] = useState();
    const [medicationType, setMedicationType] = useState();
    const [medicationStock, setMedicationStock] = useState();
    const [medicationBuyNew, setMedicationBuyNew] = useState();
    const [medicationExpDate, setMedicationExpDate] = useState();
    const [medicationExpiresValue, setMedicationExpiresValue] = useState();
    const [medicationExpiresType, setMedicationExpiresType] = useState("days");


    function resetTherapy() {
        setProfile(null);
        setMedication(null);
        setDose(null);
        setRhythm("daily");
        setStartDate(new Date().toISOString().split("T")[0])
        setEndDate(null);
        setTime([null]);
        setWeekday([false, false, false, false, false, false, false]);
        setIntervalType("hours");
        setIntervalValue(null);
    }

    function setMedicationEdit(medication) {
        setMedicationId(medication.id);
        setMedicationName(medication.name);
        setMedicationType(medication.type);
        setMedicationStock(medication.amount);
        setMedicationBuyNew(medication.reminderBuyNew);
        setMedicationExpDate(medication.expiration);
        setMedicationExpiresValue(medication.reminderExpirationValue);
        setMedicationExpiresType(medication.reminderExpirationType);
    }

    function resetMedication() {
        setMedicationName(null);
        setMedicationType(null);
        setMedicationStock(null);
        setMedicationBuyNew(null);
        setMedicationExpDate(null);
        setMedicationExpiresValue(null);
        setMedicationExpiresType("days");
        setMedicationId(null);
    }

    return (
        <GlobalContext.Provider value={{
            profile,
            setProfile,
            medication,
            setMedication,
            dose,
            setDose,
            rhythm,
            setRhythm,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
            time,
            setTime,
            weekday,
            setWeekday,
            intervalType,
            setIntervalType,
            intervalValue,
            setIntervalValue,

            routeBackToChooseMedication,
            setRouteBackToChooseMedication,

            medicationName,
            setMedicationName,
            medicationType,
            setMedicationType,
            medicationStock,
            setMedicationStock,
            medicationBuyNew,
            setMedicationBuyNew,
            medicationExpDate,
            setMedicationExpDate,
            medicationExpiresValue,
            setMedicationExpiresValue,
            medicationExpiresType,
            setMedicationExpiresType,
            medicationId,
            setMedicationId,

            setMedicationEdit,
            resetTherapy,
            resetMedication
        }}>
            {
                children
            }
        </GlobalContext.Provider>
    )
}

export function useGlobal() {
    return useContext(GlobalContext);
}