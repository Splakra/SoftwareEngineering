import {
    RouteConfig,
    route,
} from "@react-router/dev/routes";

export default [
    route("/", "./pages/dashboard/dashboard.jsx"),
    route("/addTherapy/profile", "./pages/addTherapy/chooseProfile.jsx"),
    route("/addTherapy/medication", "./pages/addTherapy/chooseMedication.jsx"),
    route("/addTherapy/dose", "./pages/addTherapy/chooseDose.jsx"),
    route("/addTherapy/reminder", "./pages/addTherapy/setReminder.jsx"),
    route("/addTherapy/review", "./pages/addTherapy/review.jsx"),
    route("/addMedication/name", "./pages/addMedication/addName.jsx"),
    route("/addMedication/type", "./pages/addMedication/addType.jsx"),
    route("/addMedication/stock", "./pages/addMedication/addStock.jsx"),
    route("/addMedication/expirationDate", "./pages/addMedication/addExpirationDate.jsx"),
    route("/addMedication/review", "./pages/addMedication/review.jsx"),
    route("/medication", "./pages/medicinePage/medicinePAge.jsx"),


    // * matches all URLs, the ? makes it optional so it will match / as well
    route("*?", "catchall.jsx"),

];