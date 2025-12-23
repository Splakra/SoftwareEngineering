import {createContext, useContext, useState} from "react";

const GlobalContext = createContext({});

export function GlobalProvider({children}) {
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

    function reset() {
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
            reset
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