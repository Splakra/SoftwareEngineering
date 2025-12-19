import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import {GlobalProvider} from "./pages/addTherapy/GlobalContext";

export function Layout({children}) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <link rel="icon" href="/src/assets/static/favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#000000"/>

            <link rel="apple-touch-icon" href="/src/assets/static/logo192.png"/>

            {/* manifest.json provides metadata used when your web app is installed on a */}
            {/* user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}
            <link rel="manifest" href="/src/assets/static/manifest.json"/>

            <title>React App</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        <GlobalProvider>
            {children}
        </GlobalProvider>
        {/* navigation component if global */}
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

export default function Root() {
    return <Outlet/>;
}