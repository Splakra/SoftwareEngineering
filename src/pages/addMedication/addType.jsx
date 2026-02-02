import PageHeader from "../../components/PageHeader/PageHeader";
import db from "../../database/DexieDatabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../globalContext";

function AddType() {
    const navigate = useNavigate();
    const { medicationType, setMedicationType, medicationId } = useGlobal();

    async function nextPage() {
        navigate("/addMedication/stock")
    }

    return (
        <div className="page">
            <PageHeader title={medicationId ? "Medikament bearbeiten" : "Medikament hinzufügen"}
                quitPath={"/medication"}
            />

            <div className="query-wrapper">
                <h2 className={"title"}>
                    Wie wird dieses Medikament verabreicht?
                </h2>

                <label htmlFor="medication-type">
                    Einheit wählen
                </label>
                <div className="select-wrapper">
                    <select
                        id="medication-type"
                        className={`control select ${!medicationType ? "is-placeholder" : ""}`}
                        value={medicationType || ""}
                        onChange={e => setMedicationType(e.target.value)}
                    >
                        <option value="" hidden>
                            Glitzer
                        </option>
                        <option value="pills">Tabletten</option>
                        <option value="fluid">Flüssig (ml)</option>
                        <option value="drops">Tropfen</option>
                        <option value="other">Sonstige</option>
                    </select>
                </div>
            </div>

            <button
                className="control button button-next"
                onClick={nextPage}
                disabled={!medicationType}
            >
                Weiter
            </button>
        </div>
    );
}

export default AddType;