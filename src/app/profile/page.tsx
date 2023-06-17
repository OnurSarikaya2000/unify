"use client";

import {
    IProfile,
    getProfileLocalStorage,
    setProfileLocalStorage,
} from "@/services/profile";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { IconTrash } from "@tabler/icons-react";

const ProfileForm: React.FC = () => {
    const { push } = useRouter();

    useEffect(() => {
        // This is only executed on the client
        // and not on the server
        const localStorageProfile = getProfileLocalStorage();
        if (localStorageProfile) {
            setProfile(localStorageProfile);
        }
    }, []);

    const [profile, setProfile] = useState<IProfile>({
        firstName: "",
        lastName: "",
        age: 0,
        study: "",
        interests: [],
        id: 101,
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Send `profile` to an API or something...
        setProfileLocalStorage({ ...profile, id: 101 });
        console.log(profile);
        push("/");
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value,
        });
    };

    const handleInterestChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newInterests = [...profile.interests];
        newInterests[index] = event.target.value;
        setProfile({
            ...profile,
            interests: newInterests,
        });
    };

    const handleAddInterest = () => {
        const newInterests = [...profile.interests];
        newInterests.push("");
        setProfile({
            ...profile,
            interests: newInterests,
        });
    };

    const deleteInterest = (index: number) => {
        const newInterests = [...profile.interests];
        newInterests.splice(index, 1);
        setProfile({
            ...profile,
            interests: newInterests,
        });
    };

    return (
        <div className={styles.container}>
            <h2>Profil</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Vorname:
                    <input
                        className={styles.input}
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                    />
                </label>

                <label className={styles.label}>
                    Nachname:
                    <input
                        className={styles.input}
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                    />
                </label>

                <label className={styles.label}>
                    Alter:
                    <input
                        className={styles.input}
                        name="age"
                        type="number"
                        value={profile.age}
                        onChange={handleChange}
                    />
                </label>

                <label className={styles.label}>
                    Studiengang:
                    <input
                        className={styles.input}
                        name="study"
                        value={profile.study}
                        onChange={handleChange}
                    />
                </label>

                {profile.interests.map((interest, index) => (
                    <div key={index} className={styles.interest}>
                        <label className={styles.label}>
                            Interesse {index + 1}:
                            <input
                                className={styles.input}
                                value={interest}
                                placeholder="Interesse"
                                onChange={(event) =>
                                    handleInterestChange(event, index)
                                }
                            />
                        </label>
                        <button
                            className={styles.deleteInterestButton}
                            onClick={() => deleteInterest(index)}
                            type="button"
                        >
                            <IconTrash color="white" />
                            Löschen
                        </button>
                    </div>
                ))}

                <button
                    className={styles.button}
                    onClick={() => handleAddInterest()}
                    type="button"
                >
                    Interesse Hinzufügen
                </button>

                <button className={styles.button} type="submit">
                    Speichern
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;
