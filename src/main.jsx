import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GlobalProvider } from "./pages/globalContext";
import { App as CapacitorApp } from '@capacitor/app';
import { SafeArea } from '@capacitor-community/safe-area';

CapacitorApp.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack) {
        window.history.back();
    } else {
        // Optional: App nicht schließen 
        // z.B. Toast anzeigen oder minimieren 
        CapacitorApp.exitApp(); // nur wenn du wirklich schließen willst 
    }
});
SafeArea.getSafeAreaInsets().then(({ insets }) => {
    document.documentElement.style.setProperty(
        '--safe-area-inset-bottom',
        `${insets.bottom}px`
    );
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </BrowserRouter>
);
