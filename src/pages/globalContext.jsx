import {createContext, useContext, useState} from "react";

const GlobalContext = createContext({});

export function GlobalProvider({children}) {
    //addTherapy
    const [therapyProfile, setTherapyProfile] = useState();
    const [therapyMedication, setTherapyMedication] = useState();
    const [therapyDose, setTherapyDose] = useState();
    const [therapyRhythm, setTherapyRhythm] = useState("daily");
    const [therapyStartDate, setTherapyStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [therapyEndDate, setTherapyEndDate] = useState();
    const [therapyTime, setTherapyTime] = useState([""]);
    const [therapyWeekday, setTherapyWeekday] = useState([false, false, false, false, false, false, false]);
    const [therapyIntervalType, setTherapyIntervalType] = useState("hours");
    const [therapyIntervalValue, setTherapyIntervalValue] = useState();
    const [therapyIntervalMonths, setTherapyIntervalMonths] = useState();
    const [therapyIntervalHoursStartTime, setTherapyIntervalHoursStartTime] = useState();

    const [routeBackToChooseMedication, setRouteBackToChooseMedication] = useState(false);
    const [routeBackToChooseProfile, setRouteBackToChooseProfile] = useState(false)

    //addMedication
    const [medicationId, setMedicationId] = useState();
    const [medicationName, setMedicationName] = useState();
    const [medicationType, setMedicationType] = useState();
    const [medicationStock, setMedicationStock] = useState();
    const [medicationBuyNew, setMedicationBuyNew] = useState();
    const [medicationExpDate, setMedicationExpDate] = useState();
    const [medicationExpiresValue, setMedicationExpiresValue] = useState();
    const [medicationExpiresType, setMedicationExpiresType] = useState("days");

    //profiles
    const [profileId, setProfileId] = useState();
    const [profileName, setProfileName] = useState();
    const [profileReminders, setProfileReminders] = useState();


    function resetTherapy() {
        setTherapyProfile(null);
        setTherapyMedication(null);
        setTherapyDose(null);
        setTherapyRhythm("daily");
        setTherapyStartDate(new Date().toISOString().split("T")[0])
        setTherapyEndDate(null);
        setTherapyTime([null]);
        setTherapyWeekday([false, false, false, false, false, false, false]);
        setTherapyIntervalType("hours");
        setTherapyIntervalValue(null);
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

    function setProfileEdit(profile) {
        setProfileId(profile.id);
        setProfileName(profile.name);
    }


    function resetProfile() {
        setProfileId(null);
        setProfileName(null);
    }


    return (
        <GlobalContext.Provider value={{
            therapyProfile,
            setTherapyProfile,
            therapyMedication,
            setTherapyMedication,
            therapyDose,
            setTherapyDose,
            therapyRhythm,
            setTherapyRhythm,
            therapyStartDate,
            setTherapyStartDate,
            therapyEndDate,
            setTherapyEndDate,
            therapyTime,
            setTherapyTime,
            therapyWeekday,
            setTherapyWeekday,
            therapyIntervalType,
            setTherapyIntervalType,
            therapyIntervalValue,
            setTherapyIntervalValue,

            routeBackToChooseMedication,
            setRouteBackToChooseMedication,
            routeBackToChooseProfile,
            setRouteBackToChooseProfile,

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

            profileId,
            setProfileId,
            profileName,
            setProfileName,
            profileReminders,
            setProfileReminders,

            setMedicationEdit,
            setProfileEdit,
            resetTherapy,
            resetMedication,
            resetProfile
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