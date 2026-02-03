import "./Profiles.css"
import db from "../../database/DexieDatabase";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEntries } from "./delete";
import { NavigationBar } from "../../components/NavigationBar/NavigationBar";
import { useGlobal } from "../globalContext";
import ProfileItems from "../../components/ProfileItems/ProfileItems";
import ToggleMenu from "../../components/ToggleMenu/ToggleMenu";
import PawIcon from "../../components/Icons/PawIcon.jsx";
import TrashIcon from "../../assets/trash.svg"
import PencilIcon from "../../assets/pencil.svg"

export default function Profiles() {
    const navigate = useNavigate();
    const { setProfileEdit, resetProfile } = useGlobal();
    const profileRefs = useRef([]);
    const [patients, setPatients] = useState([])
    const [profileActiveProfile, setProfileActiveProfile] = useState()

    function handleActiveProfile(therapyProfile) {
        profileRefs.current[therapyProfile.id].scrollIntoView({
            behavior: "smooth",
            container: "nearest",
            inline: "center"
        })
        setProfileActiveProfile(therapyProfile)
    }

    const setActiveProfileRef = (id) => (el) => {
        if (el) {
            profileRefs.current[id] = el;
        } else {
            delete profileRefs.current[id];
        }
    }

    function addProfile() {
        resetProfile();
        navigate("/profile/add");
    }

    useEffect(() => {
        async function loadPatients() {
            const loadedPatients = await db.profiles.toArray();
            setPatients(loadedPatients);
            if (!profileActiveProfile && loadedPatients.length > 0) {
                setProfileActiveProfile(loadedPatients[0]);
            }
        }

        loadPatients();
    }, [])

    function handleDelete(id) {
        db.reminders.where("profileId").equals(id).delete();
        db.profiles.delete(id); //löschen von db einträgen
        window.location.reload(); //neu laden der Seite
    }

    function editProfile(therapyProfile) {
        setProfileEdit(therapyProfile);
        navigate("/profile/add");
    }

    function formatTherapyTitle(name) {
        if (!name) return "Meine Therapien";

        const endsWithS = /[sxzß]$/i.test(name);
        return endsWithS
            ? `${name}’ Therapien`
            : `${name}s Therapien`;
    }

    const handleDeleteEntries = async () => {//schnelles entfernen von medikamenten
        const keepIds = [1, 2]; // die 2 IDs, die bleiben sollen
        await deleteEntries(keepIds);
        alert('Gelöscht – nur die gewünschten Einträge bleiben.');
    };

    return (
        <div className="profiles page-full">
            <div className="page-padding">
                <h2 className="profiles__title title">
                    Meine Patient*innen
                </h2>

                <section className="profiles__profile-section">
                    <ul className="profiles__scroller">
                        {patients.map((therapyProfile) => (
                            <li
                                className={`profiles__scroller-item ${
                                    profileActiveProfile?.id === therapyProfile.id
                                        ? "profiles__scroller-item--active"
                                        : ""
                                }`}
                                key={therapyProfile.id}
                                ref={setActiveProfileRef(therapyProfile.id)}
                            >
                                <button
                                    className="profiles__scroller-item-button"
                                    onClick={() => handleActiveProfile(therapyProfile)}
                                    aria-label={`Profil ${therapyProfile.name} auswählen`}
                                >
                                    <PawIcon className="profiles__scroller-item-icon"/>
                                    <div className="profiles__scroller-item-name with-ellipsis">
                                        {therapyProfile.name}
                                    </div>
                                </button>

                            </li>
                        ))}
                    </ul>
                </section>

                {profileActiveProfile && (
                    <section className="profiles__active-profile-section">
                        <div className="profiles__active-profile-header">
                            <h3 className="profiles__active-profile-title">
                                {formatTherapyTitle(profileActiveProfile?.name)}
                            </h3>
                            <ToggleMenu
                                className="profiles__active-profile-toggle"
                                items={[
                                    {
                                        label: "Profil löschen",
                                        icon: TrashIcon,
                                        onClick: () => handleDelete(profileActiveProfile.id),
                                    },
                                    {
                                        label: "Profil bearbeiten",
                                        icon: PencilIcon,
                                        onClick: () => editProfile(profileActiveProfile),
                                    },
                                ]}
                            />
                        </div>
                        <ProfileItems activeProfile={profileActiveProfile}/>
                    </section>
                )}

            </div>
            <NavigationBar onPlusClick={addProfile}/>
        </div>
    );
}

