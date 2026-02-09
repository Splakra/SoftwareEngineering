import PageHeader from "../components/PageHeader/PageHeader";

export const WEEKDAYS_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export function getDoseUnit(type) {
    switch (type) {
        case "pills":
            return "Tabletten";
        case "fluid":
            return "ml";
        case "drops":
            return "Tropfen";
        default:
            return "Sonstige";
    }
}

export function getMedicationUnit(type) {
    switch (type) {
        case "pills":
            return "Tabletten";
        case "fluid":
        case "drops":
            return "ml";
        default:
            return "Sonstige";
    }
}

export function getIntervalUnit(type) {
    switch (type) {
        case "hours":
            return "Stunden";
        case "days":
            return "Tage";
        case "weeks":
            return "Wochen";
        case "months":
            return "Monate";
        default:
            return "";
    }
}

export function formatWeekdays(weekdays = []) {
    return weekdays
        .map((isActive, index) => (isActive ? WEEKDAYS_SHORT[index] : null))
        .filter(Boolean)
        .join(", ");
}

export function formatTimes(times = []) {
    return times.filter(Boolean).join(", ");
}

export function formatInterval({
                                   intervalValue,
                                   intervalType,
                                   intervalStartTime
                               }) {
    if (!intervalValue || !intervalType) return "";

    const unit = getIntervalUnit(intervalType);

    return `Alle ${intervalValue} ${unit}${
        intervalStartTime ? `, ${intervalStartTime} Uhr` : ""
    }`;
}

export function formatDate(dateString) {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("de-DE");
}

export function truncate(text, maxLength = 30) {
    return text.length > maxLength
        ? text.slice(0, maxLength) + "…"
        : text;
}

export function convertDoseToAmount(dose, type) {
    if (type === "drops") return dose * 0.05; // 1 drop = 0.05ml
    return dose; // pills or ml remain as they are
}