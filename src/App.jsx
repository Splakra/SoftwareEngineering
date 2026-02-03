import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import './main.css';
import CatchAll from "./catchall";
import ChooseProfile from "./pages/addTherapy/chooseProfile";
import ChooseMedication from "./pages/addTherapy/chooseMedication";
import ChooseDose from "./pages/addTherapy/chooseDose";
import SetReminder from "./pages/addTherapy/setReminder";
import ReviewTherapy from "./pages/addTherapy/review.jsx";
import AddName from "./pages/addMedication/addName.jsx";
import AddType from "./pages/addMedication/addType.jsx";
import AddStock from "./pages/addMedication/addStock.jsx";
import AddExpirationDate from "./pages/addMedication/addExpirationDate.jsx"
import ReviewMedication from "./pages/addMedication/review.jsx"
import MedicinePage from "./pages/medicinePage/medicinePage.jsx"
import ManualIntake from "./pages/medicinePage/manualIntake.jsx"
import Profiles from "./pages/profiles/profiles.jsx"
import NewProfile from "./pages/profiles/newProfile.jsx"

import { useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";

function ViewTransitionWrapper() {
    const location = useLocation();

    useEffect(() => {
        if (!document.startViewTransition) return;

        document.startViewTransition(() => {
            // React Router rendert automatisch neu
        });
    }, [location.pathname]);

    return (
        <div className="view-transition-wrapper">
            <Outlet />
        </div>
    );
}


export default function App() {
    const location = useLocation();

    return (
        <Routes>
            <Route path="/addTherapy/profile" element={<ChooseProfile />} />
            <Route path="/addMedication/name" element={<AddName />} />
            <Route element={<ViewTransitionWrapper />}>
                <Route path="/" element={<Dashboard key={location.search} />} />
                <Route path="/addTherapy/medication" element={<ChooseMedication />} />
                <Route path="/addTherapy/dose" element={<ChooseDose />} />
                <Route path="/addTherapy/reminder" element={<SetReminder />} />
                <Route path="/addTherapy/review" element={<ReviewTherapy />} />
                <Route path="/addMedication/type" element={<AddType />} />
                <Route path="/addMedication/stock" element={<AddStock />} />
                <Route path="/addMedication/expirationDate" element={<AddExpirationDate />} />
                <Route path="/addMedication/review" element={<ReviewMedication />} />
                <Route path="/medication" element={<MedicinePage />} />
                <Route path="/manualIntake/:id" element={<ManualIntake />} />
                <Route path="/profile" element={<Profiles />} />
                <Route path="/profile/add" element={<NewProfile />} />
                {/* * matches all URLs, the ? makes it optional so it will match / as well */}
                <Route path="*?" element={<CatchAll />} />
            </Route>
        </Routes>
    );
}
