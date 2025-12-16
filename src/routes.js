import {
    RouteConfig,
    route,
} from "@react-router/dev/routes";

export default [
    //route("/", "./pages/dashboard/dashboard.jsx"),
    route("/" , "./pages/profiles/profiles.jsx"),
    route("/profile/add" , "./pages/profiles/newProfile.jsx"),
    // * matches all URLs, the ? makes it optional so it will match / as well
    route("*?", "catchall.jsx"),
];